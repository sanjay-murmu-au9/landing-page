const https = require('https');
const fs = require('fs');
const path = require('path');

const imageUrl = 'https://images.unsplash.com/photo-1600566753376-12c8ab8e17a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
const imagePath = path.join(__dirname, 'public', 'lakefront-view.jpg');

console.log('Downloading image...');

const file = fs.createWriteStream(imagePath);
https.get(imageUrl, (response) => {
    response.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log(`Image downloaded successfully to ${imagePath}`);
    });
}).on('error', (err) => {
    fs.unlink(imagePath, () => { }); // Delete the file if there's an error
    console.error('Error downloading the image:', err.message);
});
