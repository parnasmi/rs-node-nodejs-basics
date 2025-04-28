import { promises as fsPromises } from "fs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pipeline } from "stream/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const fileToRead = path.join(__dirname, "files", "fileToRead.txt");

  try {
    //Check if file exists
    try {
      await fsPromises.access(fileToRead);

      //Create readable stream
      const readStream = fs.createReadStream(fileToRead);

      // Pipe to process.stdout
      await pipeline(readStream, process.stdout);
    } catch (error) {
      throw new Error("FS operation failed");
    }
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await read();
