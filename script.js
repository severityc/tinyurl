// Function to generate a random short URL
function generateShortURL() {
    const longUrl = document.getElementById("long-url").value;
    
    if (longUrl === "") {
        alert("Please enter a URL!");
        return;
    }

    // Generate a random 6-character string for the short URL
    const randomString = Math.random().toString(36).substring(2, 8);
    const shortUrl = `https://short.ly/${randomString}`;

    // Display the result
    const resultDiv = document.getElementById("result");
    const shortUrlElement = document.getElementById("short-url");
    shortUrlElement.href = shortUrl;
    shortUrlElement.textContent = shortUrl;

    resultDiv.style.display = "block";
}
