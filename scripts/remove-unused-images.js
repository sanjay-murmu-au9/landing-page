const fs = require('fs');
const path = require('path');

// List of images to remove
const imagesToRemove = [
  'amenity-gym.jpg',
  'amenity-spa.jpg',
  'bhartiya-city.jpeg',
  'hero-pool-view.jpg',
  'houseofdreamreality06.jpg',
  'luxury-bathroom.jpg',
  'penthouse-interior.jpg',
];

// Base paths for images
const imagePaths = [
  path.join(__dirname, '../public/images'),
  path.join(__dirname, '../public/images/optimized'),
];

// Function to safely remove file if it exists
function safeRemoveFile(filePath) {
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`✅ Removed: ${filePath}`);
      return true;
    } catch (err) {
      console.error(`❌ Error removing ${filePath}: ${err.message}`);
      return false;
    }
  } else {
    console.log(`⚠️ File not found: ${filePath}`);
    return false;
  }
}

// Track statistics
let totalRemoved = 0;
let totalSize = 0;

// Process each image in the list
imagesToRemove.forEach(imageName => {
  imagePaths.forEach(basePath => {
    const imagePath = path.join(basePath, imageName);
    
    // Get file size before removing
    try {
      if (fs.existsSync(imagePath)) {
        const stats = fs.statSync(imagePath);
        totalSize += stats.size;
      }
    } catch (err) {
      // Ignore errors when getting file size
    }
    
    // Remove the file
    if (safeRemoveFile(imagePath)) {
      totalRemoved++;
    }
  });
});

// Convert bytes to more readable format
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

console.log(`\n=== Cleanup Summary ===`);
console.log(`Total images removed: ${totalRemoved}`);
console.log(`Total space saved: ${formatBytes(totalSize)}`);
console.log(`\nThe website should now be lighter and faster to load.`);
