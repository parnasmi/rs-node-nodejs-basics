import { Worker } from "worker_threads";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
  const numCPUs = os.cpus().length;
  const workers = [];
  const results = [];
  for (let i = 0; i < numCPUs; i++) {
    workers.push(
      new Promise((resolve) => {
        const worker = new Worker(path.join(__dirname, "worker.js"));
        worker.postMessage(10 + i);

        worker.on("message", (data) => {
          resolve({ status: "resolved", data });
        });

        worker.on("error", () => {
          resolve({ status: "error", data: null });
        });

        worker.on("exit", (code) => {
          if (code !== 0) {
            resolve({ status: "error", data: null });
          }
        });
      })
    );
  }

  const allResults = await Promise.allSettled(workers);
  console.log(allResults);
};

await performCalculations();
