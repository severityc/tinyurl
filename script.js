// Utility to encode a string (similar to what you've shown)
function encodeString(str, key) {
    let encoded = '';
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        let keyChar = btoa(key).charCodeAt(i % key.length);
        keyChar = keyChar % 256;
        charCode = charCode ^ keyChar;
        encoded += String.fromCharCode(charCode);
    }
    return btoa(btoa(encoded)); // Double base64 encoding for extra obfuscation
}

// Utility to decode a string
function decodeString(encodedStr, key) {
    let decoded = '';
    encodedStr = atob(atob(encodedStr)); // Reverse the double base64 encoding
    for (let i = 0; i < decoded.length; i++) {
        let charCode = decoded.charCodeAt(i);
        let keyChar = btoa(key).charCodeAt(i % key.length);
        keyChar = keyChar % 256;
        charCode = charCode ^ keyChar;
        decoded += String.fromCharCode(charCode);
    }
    return decoded;
}

// Function to generate short URL and store mapping in localStorage
function generateShortURL() {
    const longUrl = document.getElementById("long-url").value;
    
    if (longUrl === "") {
        alert("Please enter a URL!");
        return;
    }

    // Generate a short URL using a simple hash-like approach
    const shortCode = Math.random().toString(36).substring(2, 8); // Random short code
    const shortUrl = `${window.location.origin}/#${shortCode}`;

    // Store the long URL in localStorage with the short URL code
    localStorage.setItem(shortCode, longUrl);

    // Display the result
    const resultDiv = document.getElementById("result");
    const shortUrlElement = document.getElementById("short-url");
    shortUrlElement.href = shortUrl;
    shortUrlElement.textContent = shortUrl;

    resultDiv.style.display = "block";
}

// Redirect based on the short URL hash
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
