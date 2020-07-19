const filename = '../data/tasks.json'
const fs = require('fs')
let tasks = require(filename)
const helper = require('../helpers/helper.js')

function getTasks() {
    return new Promise((resolve, reject) => {
        if (tasks.length === 0) {
            reject({
                message: 'no tasks available',
                status: 202
            })
        }
        resolve(tasks)
    })
}

function getTask(id) {
 return new Promise((resolve, reject) => {
    helper.mustBeInArray(tasks, id)
      .then(task => resolve(task))
      .catch(err => reject(err))
    })
}

function insertTask(newTask) {
    return new Promise((resolve, reject) => {
        newTask.id=tasks.length+1
        console.log(newTask); 
        tasks.push(newTask)
        //writeJSONFile(tasks)
        resolve(newTask)
    })
}
function updateTask(id, newTask) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(tasks, id)
        .then(task => {
            const index = tasks.findIndex(p => p.id == task.id)
            id = { id: task.id }           
            tasks[index] = { ...id, ...newTask }
           // writeJSONFile(tasks)
            resolve(tasks[index])
        })
        .catch(err => reject(err))
    })
}

function deleteTask(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(tasks, id)
        .then(() => {
            let tempIndex=tasks.findIndex(t=>t.id==id);
            let temp=tasks[tempIndex]
            tasks.splice(tasks.indexOf(temp), 1)
         
           // writeJSONFile(tasks)
            resolve()
        })
        .catch(err => reject(err))
    })
}

function writeJSONFile(content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
    insertTask,
    getTasks,
    getTask, 
    updateTask,
    deleteTask
}