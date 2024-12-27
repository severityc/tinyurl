// Custom encoding function (XOR and Base64 encoding)
function encodeString(str, key) {
    let encoded = '';
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        let keyChar = btoa(key).charCodeAt(i % key.length);
        keyChar = keyChar % 256;
        charCode = charCode ^ keyChar;
        encoded += String.fromCharCode(charCode);
    }
    return btoa(btoa(encoded)); // Double base64 encoding for added obfuscation
}

// Function to generate a short URL
function generateShortURL() {
    const longUrl = document.getElementById("long-url").value;
    
    if (longUrl === "") {
        alert("Please enter a URL!");
        return;
    }

    // Generate a short URL code (random 6-character string)
    const shortCode = Math.random().toString(36).substring(2, 8); 

    // You can encode the long URL to obfuscate it (using XOR encoding)
    const encodedLongUrl = encodeString(longUrl, shortCode); 

    // Store the mapping in localStorage
    localStorage.setItem(shortCode, encodedLongUrl);

    // Generate the final short URL
    const shortUrl = `${window.location.origin}/#${shortCode}`;

    // Display the short URL
    const resultDiv = document.getElementById("result");
    const shortUrlElement = document.getElementById("short-url");
    shortUrlElement.href = shortUrl;
    shortUrlElement.textContent = shortUrl;

    resultDiv.style.display = "block";
}

// Handle redirection based on the short URL hash
window.onload = function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const encodedLongUrl = localStorage.getItem(hash);
        if (encodedLongUrl) {
            const decodedUrl = decodeString(encodedLongUrl, hash); // Decode the URL
            window.location.href = decodedUrl; // Redirect to the long URL
        } else {
            alert("This short URL doesn't exist.");
        }
    }
};

// Custom decoding function (XOR and Base64 decoding)
function decodeString(encodedStr, key) {
    let decoded = '';
    encodedStr = atob(atob(encodedStr)); // Reverse the double base64 encoding
    for (let i = 0; i < encodedStr.length; i++) {
        let charCode = encodedStr.charCodeAt(i);
        let keyChar = btoa(key).charCodeAt(i % key.length);
        keyChar = keyChar % 256;
        charCode = charCode ^ keyChar;
        decoded += String.fromCharCode(charCode);
    }
    return decoded;
}
