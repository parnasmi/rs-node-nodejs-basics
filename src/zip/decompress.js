import path from "path";
import { fileURLToPath } from "url";
import * as fs from "fs";
import { pipeline } from "stream/promises";
import { createGunzip } from "zlib";

// Derive __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
  const sourcePath = path.join(__dirname, "files", "archive.gz");
  const destinationPath = path.join(__dirname, "files", "fileToCompress.txt");

  try {
    // Create streams
    const readStream = fs.createReadStream(sourcePath);
    const gunzipStream = createGunzip();
    const writeStream = fs.createWriteStream(destinationPath);

    await pipeline(readStream, gunzipStream, writeStream);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await decompress();
