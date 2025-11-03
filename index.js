
import { orkesConductorClient, WorkflowExecutor, simpleTask, workflow } from "@io-orkes/conductor-javascript";

async function run() {
  const client = await orkesConductorClient({
    serverUrl: "https://developer.orkescloud.com/api",
    keyId: "3b04974b5b9b-b902-11f0-b1f1-36f6dc66f9b7",
    keySecret: "J5LHJlN0WnvahMnrGhJggsz0qeAfsOBUoGfEzNigD7BM0n6Q"
  });

  const executor = new WorkflowExecutor(client);

  const myWorkflow = workflow("hello_world", [
    simpleTask("greet_task", "greeting_task", { message: "Hello World!" })
  ]);

  await executor.registerWorkflow(true, myWorkflow);

  const executionId = await executor.startWorkflow({
    name: "hello_world",
    version: 1,
    input: { name: "Developer" }
  });

  console.log(`Workflow started with ID: `);
}

run().catch(error => console.error(error));
