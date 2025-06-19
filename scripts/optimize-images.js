const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images/optimized');

// Enable additional logging for sharp
sharp.queue.on('change', function (queueLength) {
    console.log('Queue contains ' + queueLength + ' task(s)');
});

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImage(inputPath, outputPath, filename) {
    try {
        // Check if file exists
        if (!fs.existsSync(inputPath)) {
            console.error(`❌ File not found: ${filename}`);
            return;
        }

        // Skip if it's not an image file
        if (filename === 'image-data.json' || filename === 'optimized') {
            console.log(`⏭️ Skipping non-image file: ${filename}`);
            return;
        }

        // Check file size
        const stats = fs.statSync(inputPath);
        console.log(`\n🔄 Processing ${filename} (${(stats.size / 1024 / 1024).toFixed(2)}MB)`);

        // Get image metadata
        const metadata = await sharp(inputPath).metadata();
        console.log(`📊 Image details: format=${metadata.format}, size=${metadata.width}x${metadata.height}`);

        // Process image
        await sharp(inputPath)
            .jpeg({ quality: 80 })
            .resize(1920, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .toFile(outputPath);

        const outputStats = fs.statSync(outputPath);
        console.log(`✅ Successfully optimized: ${filename}`);
        console.log(`   Size reduction: ${(stats.size / 1024).toFixed(2)}KB → ${(outputStats.size / 1024).toFixed(2)}KB`);
    } catch (error) {
        console.error(`❌ Error processing ${filename}:`);
        console.error(`   Error details: ${error.message}`);
        if (error.stack) {
            console.error(`   Stack trace: ${error.stack}`);
        }
    }
}

async function optimizeImages() {
    try {
        console.log('🔍 Checking input directory:', inputDir);

        if (!fs.existsSync(inputDir)) {
            console.error('❌ Input directory does not exist!');
            return;
        }

        const files = fs.readdirSync(inputDir).filter(file =>
            file !== 'image-data.json' &&
            file !== 'optimized' &&
            /\.(jpg|jpeg|png)$/i.test(file)
        );

        console.log(`📁 Found ${files.length} image files to process`);

        for (const file of files) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, file);
            await optimizeImage(inputPath, outputPath, file);
        }

        console.log('\n✨ Optimization complete!');
        console.log(`📁 Optimized images can be found in: ${outputDir}`);
    } catch (error) {
        console.error('❌ Fatal error:', error);
    }
}

optimizeImages();
