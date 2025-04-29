import path from "path";
import { fileURLToPath } from "url";
import * as fs from "fs";
import { promises as fsp } from "fs";
import crypto from "crypto";
import { pipeline } from "stream/promises";

// Derive __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
  const fileToHash = path.join(
    __dirname,
    "files",
    "fileToCalculateHashFor.txt"
  );

  try {
    //Check if file exists
    try {
      await fsp.access(fileToHash);
    } catch (error) {
      throw new Error("FS operation failed");
    }

    //Create readable stream
    const readStream = fs.createReadStream(fileToHash);

    // Create SHA256 hash stream
    const hashStream = crypto.createHash("sha256");

    // Pipe streams and wait for completion
    await pipeline(readStream, hashStream);

    // Get the hash as hex
    const hash = hashStream.digest("hex");

    // Log the hash
    console.log(hash);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await calculateHash();
