import { TaskManager, ConductorWorker } from '@io-orkes/conductor-javascript';

// Define the worker for greet_task
const greetTaskWorker: ConductorWorker = {
    taskDefName: 'greet_task',
    execute: async (task) => {
        // Logic to handle the task
        const message = 'Hello World';

        // Return the task result
        return {
            status: 'COMPLETED',
            outputData: {
                message: message
            }
        };
    }
};

// Setup and start the TaskManager with the worker
const taskManager = new TaskManager(client, [greetTaskWorker], {
    options: {
        pollInterval: 1000, // Polling interval
        concurrency: 2 // Number of tasks to run concurrently
    }
});

// Start polling for tasks
taskManager.startPolling();
