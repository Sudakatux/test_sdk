const { orkesConductorClient } = require('@io-orkes/conductor-javascript');
const { TaskManager } = require('@io-orkes/conductor-javascript');

async function setupWorker() {
    // Initialize the Conductor client
    const client = await orkesConductorClient({
        keyId: 'YOUR_API_KEY_ID',
        keySecret: 'YOUR_API_SECRET',
        serverUrl: 'https://your-conductor-server.com/api'
    });

    // Define your worker, specifying the task name and execution logic
    const helloWorldWorker = {
        taskDefName: 'hello_world_task',
        execute: async () => {
            console.log("Executing Hello World task");
            return {
                outputData: {
                    message: "Hello, World!"
                },
                status: "COMPLETED"
            };
        }
    };

    // Create the TaskManager and register your worker
    const taskManager = new TaskManager(client, [helloWorldWorker], {
        options: {
            pollInterval: 1000, // Poll every second
            concurrency: 5      // Allow up to 5 concurrent executions
        }
    });

    // Start polling for tasks
    taskManager.startPolling();
    console.log("Hello World Worker is now running.");
}

setupWorker().catch(console.error);
