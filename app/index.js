var fs = require('fs');
var path = require('path'); 
var taskUtils = require(path.join(__dirname, 'task-utils.js'));

switch (process.argv[2]) {
    case 'add': 
        taskUtils.addTask({
            'title': process.argv[3],
            'description': process.argv[4]
        });
        taskUtils.writeTasks();
    break;

    case 'del': 
        taskUtils.searchTask(process.argv[3], taskUtils.delTask);
        taskUtils.writeTasks();
    break;

    case 'complete': 
        taskUtils.searchTask(process.argv[3], taskUtils.setComplete);
        taskUtils.writeTasks();
    break;

    case 'incomplete': 
        taskUtils.searchTask(process.argv[3], taskUtils.setInComplete);
        taskUtils.writeTasks();
    break;

    case 'show': 
        var criteria = process.argv[3];
    default:
    case 'list': 
        taskUtils.searchTask(criteria || '', taskUtils.showTask);
    break;
};

