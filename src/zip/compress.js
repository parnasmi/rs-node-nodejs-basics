import path from "path";
import { fileURLToPath } from "url";
import * as fs from "fs";
import { pipeline } from "stream/promises";
import { createGzip } from "zlib";

// Derive __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
  const sourcePath = path.join(__dirname, "files", "fileToCompress.txt");
  const destPath = path.join(__dirname, "files", "archive.gz");

  try {
    const readStream = fs.createReadStream(sourcePath);
    const gzipStream = createGzip();
    const writeStream = fs.createWriteStream(destPath);

    //Piping together
    await pipeline(readStream, gzipStream, writeStream);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await compress();
