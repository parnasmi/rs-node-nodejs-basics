import { Transform } from "stream";
import { pipeline } from "stream/promises";
const transform = async () => {
  // Create a Transform Stream to reverse text
  const reverseTransform = new Transform({
    readableObjectMode: false,
    writableObjectMode: false,
    transform(chunk, encoding, callback) {
      // Converting the chunk to string and reverse it
      const reversed = chunk.toString().split("").reverse().join("");

      // Pushing the reversed chunk
      this.push(reversed);
      callback();
    },
  });

  try {
    // Pipe process.stdin through reverseTransform to process.stdout
    await pipeline(process.stdin, reverseTransform, process.stdout);
  } catch (err) {
    throw new Error("Stream operation failed");
  }
};

await transform();
