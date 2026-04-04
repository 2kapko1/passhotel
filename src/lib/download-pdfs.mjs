import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

const PDFS = [
  { slug: 'menu-okolicznosciowe', filename: 'Passhotel_Menu_Okolicznosciowe.pdf' },
  { slug: 'catering', filename: 'Passhotel_Catering.pdf' },
  { slug: 'menu-glowne', filename: 'Passhotel_Bistro_Glowne.pdf' },
  { slug: 'menu-skrocone', filename: 'Passhotel_Bistro_Skrocone.pdf' },
  { slug: 'napoje', filename: 'Passhotel_Bistro_Napoje.pdf' },
];

const BASE_URL = 'https://cms.vify.pl/sites/passhotel/slots';
const OUTPUT_DIR = path.resolve('static/assets');
const MANIFEST_PATH = path.resolve('src/data/pdf-manifest.json');

async function downloadFile(url, outputPath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }
  const fileStream = fs.createWriteStream(outputPath);
  await pipeline(response.body, fileStream);
}

let isDone = false;

export async function downloadAllPdfs() {
  if (isDone) {
    console.log('PDFs already downloaded, skipping...');
    return;
  }
  isDone = true;

  console.log('Downloading PDFs from CMS...');

  // Create build-specific hash
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const buildHash = `${year}${month}${day}${hour}${minute}`;
  const manifest = {};

  // Ensure output directory exists and is empty
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const pdf of PDFS) {
    const url = `${BASE_URL}/${pdf.slug}`;
    const ext = path.extname(pdf.filename);
    const baseName = path.basename(pdf.filename, ext);
    const hashedFilename = `${baseName}_${buildHash}${ext}`;
    const outputPath = path.join(OUTPUT_DIR, hashedFilename);

    try {
      await downloadFile(url, outputPath);
      console.log(`Successfully downloaded: ${hashedFilename}`);
      manifest[pdf.slug] = `/assets/${hashedFilename}`;
    } catch (error) {
      console.error(`Error downloading ${pdf.filename}:`, error.message);
      // Fallback to hashed version even if download fails, so links are always "unique" per build
      manifest[pdf.slug] = `/assets/${hashedFilename}`;
    }
  }

  // Ensure src/data exists
  if (!fs.existsSync(path.dirname(MANIFEST_PATH))) {
    fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  }

  // Write manifest
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`Manifest created at: ${MANIFEST_PATH}`);
}

// If running directly
if (import.meta.url === `file://${process.argv[1]}`) {
  downloadAllPdfs();
}
