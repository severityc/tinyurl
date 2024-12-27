function generateShortURL() {
    const longUrl = document.getElementById("long-url").value;
    
    if (longUrl === "") {
        alert("Please enter a URL!");
        return;
    }

    // Generate a random 6-character string for the short URL
    const randomString = Math.random().toString(36).substring(2, 8);
    const shortUrl = `${window.location.origin}/#${randomString}`;

    // Save the long URL to localStorage with the short URL as the key
    localStorage.setItem(randomString, longUrl);

    // Display the result
    const resultDiv = document.getElementById("result");
    const shortUrlElement = document.getElementById("short-url");
    shortUrlElement.href = shortUrl;
    shortUrlElement.textContent = shortUrl;

    resultDiv.style.display = "block";
}

// Function to handle URL redirection when visiting short URL
window.onload = function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const longUrl = localStorage.getItem(hash);
        if (longUrl) {
            window.location.href = longUrl; // Redirect to the long URL
        } else {
            alert("This short URL doesn't exist.");
        }
    }
};
