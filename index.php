<?php
require_once 'config.php'; // Including config file for DB connection

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['long_url'])) {
    $long_url = $_POST['long_url'];

    // Generate a short code and check if it already exists
    do {
        $short_code = generateShortCode();
        $stmt = $pdo->prepare("SELECT id FROM urls WHERE short_code = ?");
        $stmt->execute([$short_code]);
        $exists = $stmt->fetchColumn();
    } while ($exists);
    
    // Store the mapping in the database
    $stmt = $pdo->prepare("INSERT INTO urls (short_code, long_url) VALUES (?, ?)");
    $stmt->execute([$short_code, $long_url]);

    echo "Short URL created: <a href='/r/$short_code'>/r/$short_code</a>";
}

// Function to generate a random short code
function generateShortCode($length = 6) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>URL Shortener</title>
</head>
<body>
    <h1>URL Shortener</h1>
    <form method="POST">
        <label for="long_url">Enter Long URL:</label>
        <input type="text" name="long_url" id="long_url" required>
        <button type="submit">Shorten URL</button>
    </form>
</body>
</html>
