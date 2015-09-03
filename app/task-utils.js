var fs = require('fs');
var path = require('path'); 

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
    delTask: function( task ) {
        return this.setTaskAttr(task, 'task_id', 0);
    },
    setComplete: function( task ) {
        return this.setTaskAttr(task, 'completed', true);
    },
    setInComplete: function( task ) {
        return this.setTaskAttr(task, 'completed', false);
    }, 
    showTask: function( task ) {
        console.log(task);
        return task;
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
    setTaskAttr: function(task, paramName, value) {
        task[paramName] = value;
        return task;
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

module.exports =  taskUtil;