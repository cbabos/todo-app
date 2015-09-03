#!/usr/bin/env node
var fs = require('fs');
var path = require('path'); 
var chalk = require('chalk');
var taskUtils = require(path.join(__dirname, 'task-utils.js'));

console.log(
    chalk.bold.blue(
        '###########################################\n' + 
        '### TASK list #############################\n' +
        '###########################################\n' 
    )
);

switch (process.argv[2]) {
    case 'add': 
        if (process.argv[3] && process.argv[4]) {
            taskUtils.addTask({
                'title': process.argv[3],
                'description': process.argv[4]
            });
            taskUtils.writeTasks();
        }
        taskUtils.searchTask('', taskUtils.showTask);
    break;

    case 'delete': 
        if (process.argv[3]) {
            taskUtils.searchTask(process.argv[3], taskUtils.delTask);
            taskUtils.writeTasks();
        }
        taskUtils.searchTask('', taskUtils.showTask);
    break;

    case 'complete': 
        if (process.argv[3]) {
            taskUtils.searchTask(process.argv[3], taskUtils.setComplete);
            taskUtils.writeTasks();
        }
        taskUtils.searchTask('', taskUtils.showTask);
    break;

    case 'incomplete': 
        if (process.argv[3]) {
            taskUtils.searchTask(process.argv[3], taskUtils.setInComplete);
            taskUtils.writeTasks();
        }
        taskUtils.searchTask('', taskUtils.showTask);
    break;

    case 'show': 
        var criteria = process.argv[3];
    default:
    case 'list': 
        taskUtils.searchTask(criteria || '', taskUtils.showTask);
    break;
};
