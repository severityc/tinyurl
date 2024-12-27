<?php
require_once 'config.php'; // Including config file for DB connection

// Get the short code from the URL (e.g., /r/shortcode)
$short_code = trim($_GET['code']);

if ($short_code) {
    // Fetch the long URL from the database
    $stmt = $pdo->prepare("SELECT long_url FROM urls WHERE short_code = ?");
    $stmt->execute([$short_code]);
    $long_url = $stmt->fetchColumn();
    
    if ($long_url) {
        // Redirect to the long URL
        header("Location: $long_url");
        exit;
    } else {
        echo "Short URL not found.";
    }
} else {
    echo "No short code provided.";
}
