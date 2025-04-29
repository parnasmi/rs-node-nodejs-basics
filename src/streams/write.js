import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { pipeline } from "stream/promises";

// Derive __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
  const fileToWrite = path.join(__dirname, "files", "fileToWrite.txt");

  try {
    //Create writeable stream
    const writeStream = fs.createWriteStream(fileToWrite);
    // Pipe process.stdin to writeStream
    await pipeline(process.stdin, writeStream);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await write();
