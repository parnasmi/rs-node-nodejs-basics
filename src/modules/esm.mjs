import { release, type, version } from "os";
import { createServer as createServerHttp } from "http";
import { fileURLToPath } from "url";
import path from "path";

// Derive __dirname and __filename for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import CommonJS module dynamically
await import("./files/c.cjs");

const random = Math.random();

// Conditionally import JSON file dynamically

let unknownObject;

if (random > 0.5) {
  unknownObject = (await import("./files/a.json", { with: { type: "json" } }))
    .default;
} else {
  unknownObject = (await import("./files/b.json", { with: { type: "json" } }))
    .default;
}

//Log System Imformation
console.log(`Release: ${release()}`);
console.log(`Version: ${version()}`);
console.log(`Path segment separator is ${path.sep}`);
console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

//Create HTTP server

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

//Log unknown object;
console.log("unknownObject", unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export { unknownObject, myServer };
