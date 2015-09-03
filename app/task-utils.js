var fs = require('fs');
var path = require('path'); 
var chalk = require('chalk');
var moment = require('moment');

var taskUtil = {
    config: {
        tasksJSON: path.join(__dirname, 'tasks.json') 
    },
    tasks: [],
    
    loadTasks: function() {
        // Load current tasks
        try {
            this.tasks = require(this.config.tasksJSON);
        } catch (error) {
            console.log(error);
            console.log('[LOG] JSON datastore will be created!');
        }
    },
    addTask: function( taskData ) {
        var task = {
            task_id:     this.tasks.length + 1,
            title:       taskData.title,
            description: taskData.description,
            completed:   false,
            created:     new Date().getTime()
        };

        this.tasks.push(task);
    },
    setTaskAttr: function(task, paramName, value) {
        task[paramName] = value;
        return task;
    },
    delTask: function( task ) {
        return taskUtil.setTaskAttr(task, 'task_id', 0);
    },
    setComplete: function( task ) {
        return taskUtil.setTaskAttr(task, 'completed', true);
    },
    setInComplete: function( task ) {
        return taskUtil.setTaskAttr(task, 'completed', false);
    }, 
    showTask: function( task ) {
        var titleStyle = task.completed ? chalk.bold.yellow : chalk.bold.red;

        console.log(titleStyle(task.title + ' (' + 
            moment(task.created).fromNow()  + ')' +
            "\n===========================================\n") +
            chalk.white(task.description) + "\n")
        return task;
    }, 
    taskList: function() {
        this.tasks.forEach(function(current) {
            var titleStyle = current.completed ?
                chalk.bold.yellow : chalk.bold.red;

            console.log(
                titleStyle('» ' + current.title + '')
            );
        });
    },
    searchTask: function( searchString, cb ) {
        var search = new RegExp(searchString, 'i');
        tasks = this.tasks.map(function(current) {
            if (search.test(current.title)) {
                return cb(current);
            }
            return current;
        });  
    }, 
    writeTasks: function() {
        var that = this;

        this.tasks = this.tasks.filter(function(task) {
            return !!task.task_id;
        }).map(function(task, index) {
           return that.setTaskAttr(task, 'task_id', index + 1);   
        });

        fs.writeFile(this.config.tasksJSON, 
            JSON.stringify(this.tasks, null, ' '));
    }
}

taskUtil.loadTasks();

module.exports = taskUtil;
