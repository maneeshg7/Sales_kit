// script.js

// Utility function to create an XMLHttpRequest
function createXHR() {
    const xhr = new XMLHttpRequest();
    return xhr;
}

// Function to handle file uploads
function uploadFile(file) {
    const xhr = createXHR();
    const formData = new FormData();
    formData.append("file", file);

    xhr.open("POST", "/upload", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert("File uploaded successfully!");
        } else {
            alert("Error uploading file.");
        }
    };
    xhr.send(formData);
}

// Function to search for files
function searchFiles(query) {
    const xhr = createXHR();
    xhr.open("GET", `/search?query=${encodeURIComponent(query)}`, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const results = JSON.parse(xhr.responseText);
            displayResults(results);
        } else {
            alert("Error searching files.");
        }
    };
    xhr.send();
}

// Function to download a file
function downloadFile(fileId) {
    const xhr = createXHR();
    xhr.open("GET", `/download?id=${fileId}`, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
        if (xhr.status === 200) {
            const url = window.URL.createObjectURL(xhr.response);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileId; // You can specify the file name here
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            alert("Error downloading file.");
        }
    };
    xhr.send();
}

// Display search results in UI (implementation would depend on your HTML structure)
function displayResults(results) {
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = ""; // Clear previous results
    results.forEach(file => {
        const div = document.createElement("div");
        div.textContent = file.name; // Assuming `name` is a property in your results
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download";
        downloadButton.onclick = () => downloadFile(file.id);
        div.appendChild(downloadButton);
        resultContainer.appendChild(div);
    });
}

// Event listeners for file upload and search input
document.getElementById("uploadButton").onclick = () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (file) {
        uploadFile(file);
    } else {
        alert("Please select a file to upload.");
    }
};

document.getElementById("searchButton").onclick = () => {
    const queryInput = document.getElementById("searchInput");
    const query = queryInput.value;
    searchFiles(query);
};
