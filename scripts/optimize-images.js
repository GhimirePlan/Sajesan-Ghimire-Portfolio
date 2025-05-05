import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const optimizeImage = async (inputPath, outputPath, options = {}) => {
  try {
    await sharp(inputPath)
      .webp({
        quality: 80,
        effort: 6,
        ...options
      })
      .toFile(outputPath);
    
    console.log(`Successfully optimized ${inputPath} to ${outputPath}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
};

// Optimize hero background
const heroInputPath = join(__dirname, '../src/assets/herobg.png');
const heroOutputPath = join(__dirname, '../src/assets/herobg.webp');

optimizeImage(heroInputPath, heroOutputPath); 