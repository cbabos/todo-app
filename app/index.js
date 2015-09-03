var fs = require('fs');
var path = require('path'); 

var config = {
    tasksJSON: path.join(__dirname, 'tasks.json')
};

var tasks = [];

// Load current tasks
try {
    tasks = require(config.tasksJSON);
} catch (error) {
    console.log(error);
    console.log('[LOG] JSON datastore will be created!');
}

// Write new tasks array to file
var writeTasks = function() {
    console.log(tasks);
    (function() {
        tasks = tasks.filter(function(task) {
            return !!task.task_id;
        }).map(function(task, index) {
           return setTaskAttr(task, 'task_id', index + 1);   
        });
    })();

    fs.writeFile(config.tasksJSON, JSON.stringify(tasks, null, ' '));
};

// Add a new (incomplete) task
var addTask = function( taskData ) {
    var task = {
        task_id:     tasks.length + 1,
        title:       taskData.title,
        description: taskData.description,
        completed:   false,
        created:     new Date().getTime()
    };

    tasks.push(task);
};

var delTask = function( task ) {
    return setTaskAttr(task, 'task_id', 0);
};

var setComplete = function( task ) {
    return setTaskAttr(task, 'completed', true);
};

var setInComplete = function( task ) {
    return setTaskAttr(task, 'completed', false);
};

var showTask = function( task ) {
    console.log(task);
    return task;
}

var searchTask = function( searchString, cb ) {
    var search = new RegExp(searchString, 'i');
    tasks = tasks.map(function(current) {
        if (search.test(current.title)) {
            return cb(current);
        }
        return current;
    });  
}

var setTaskAttr = function(task, paramName, value) {
    task[paramName] = value;
    return task;
};

switch (process.argv[2]) {
    case 'add': 
        addTask({
            'title': process.argv[3],
            'description': process.argv[4]
        });
        writeTasks();
    break;

    case 'del': 
        searchTask(process.argv[3], delTask);
        writeTasks();
    break;

    case 'complete': 
        searchTask(process.argv[3], setComplete);
        writeTasks();
    break;

    case 'incomplete': 
        searchTask(process.argv[3], setInComplete);
        writeTasks();
    break;

    case 'show': 
        searchTask(process.argv[3], showTask);
    break;

    default:
    case 'list': 
        console.log(tasks);
    break;
};

