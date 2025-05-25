// This script downloads premium images for the Prestige Somerville luxury apartments landing page
// Usage: node scripts/download-premium-images.js

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log('Created images directory:', imagesDir);
}

// Premium high-quality images for luxury real estate
const premiumImages = [
    {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
        filename: 'hero-luxury-exterior-1.jpg',
        alt: 'Luxury lakefront villa with modern architecture'
    },
    {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
        filename: 'hero-luxury-exterior-2.jpg',
        alt: 'Modern luxury apartment exterior with landscaping'
    },
    {
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
        filename: 'hero-living-space.jpg',
        alt: 'Elegant living space with panoramic lake view'
    },
    {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
        filename: 'hero-pool-view.jpg',
        alt: 'Premium infinity pool with architectural lighting'
    },
    {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
        filename: 'luxury-home-facade.jpg',
        alt: 'Modern luxury home facade with artistic design'
    },
    {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
        filename: 'penthouse-interior.jpg',
        alt: 'Elegant penthouse interior with premium finishes'
    },
    {
        url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
        filename: 'luxury-bathroom.jpg',
        alt: 'Luxury bathroom with marble and premium fixtures'
    },
    {
        url: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
        filename: 'luxury-kitchen.jpg',
        alt: 'Premium kitchen with top-of-the-line appliances'
    },
    {
        url: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
        filename: 'modern-bedroom.jpg',
        alt: 'Modern bedroom with luxurious design elements'
    },
    {
        url: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
        filename: 'amenity-gym.jpg',
        alt: 'Premium fitness center with modern equipment'
    },
    {
        url: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
        filename: 'amenity-spa.jpg',
        alt: 'Luxury spa area with premium relaxation facilities'
    },
    {
        url: 'https://images.unsplash.com/photo-1603712537493-1208e63ce226?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
        filename: 'aerial-view.jpg',
        alt: 'Aerial view of the luxury apartment complex'
    }
];

// Function to download an image
const downloadImage = (url, filename) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(imagesDir, filename);
        const file = fs.createWriteStream(filePath);

        https.get(url, response => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${filename}`);
                resolve(filePath);
            });
        }).on('error', err => {
            fs.unlink(filePath, () => { }); // Delete the file if an error occurs
            console.error(`Error downloading ${filename}:`, err.message);
            reject(err);
        });
    });
};

// Download all images
async function downloadAllImages() {
    console.log('Starting download of premium images...');

    try {
        const promises = premiumImages.map(img =>
            downloadImage(img.url, img.filename)
        );

        await Promise.all(promises);
        console.log('All images downloaded successfully!');

        // Create a JSON file with image metadata
        const imageMetadata = premiumImages.map(img => ({
            src: `/images/${img.filename}`,
            alt: img.alt
        }));

        fs.writeFileSync(
            path.join(__dirname, '../public/images/image-data.json'),
            JSON.stringify(imageMetadata, null, 2)
        );

        console.log('Image metadata saved to public/images/image-data.json');
    } catch (error) {
        console.error('Error in download process:', error);
    }
}

// Run the download
downloadAllImages();
