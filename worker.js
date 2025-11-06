import { orkesConductorClient, TaskRunner } from "@io-orkes/conductor-javascript";

async function startWorker() {
  const client = await orkesConductorClient({
    serverUrl: "https://developer.orkescloud.com/api",
    keyId: "3b04974b5b9b-b902-11f0-b1f1-36f6dc66f9b7", // Same as index.js
    keySecret: "J5LHJlN0WnvahMnrGhJggsz0qeAfsOBUoGfEzNigD7BM0n6Q" // Same as index.js
  });
  
  const runner = new TaskRunner(client, {
    taskDefName: "greet_task",
    execute: async (task) => {
      // Logic for task execution
      task.status = "COMPLETED";
      task.outputData = { message: "Hello World!" };
      return task;
    }
  });

  runner.start();
}

startWorker().catch(error => console.error("Error starting worker:", error));
