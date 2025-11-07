// JavaScript worker for greet_task

function greetTask() {
    return {
        status: 'COMPLETED',
        message: 'Hello World'
    };
}

module.exports = greetTask;