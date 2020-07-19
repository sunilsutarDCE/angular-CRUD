import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskList: Task[] = [
    {
      id: 1,
      description: 'Task1',
      status:'Not Started',
      priority:"Low"
    },
    {
      id: 2,
      description: 'Task2',
      status:'Started',
      priority:"High"
    },
    {
      id: 3,
      description: 'Task3',
      status:'Not Started',
      priority:"Medium"
    }
  ];

  constructor() { }

  getTasksList():Task[]
  {
    return this.taskList;
  }

  getTask(task):Task
  {
    let tempIndex=this.taskList.findIndex(t=>t.id==task.id)
    return this.taskList[tempIndex];
  }

  addTask(task:Task)
  {
    this.taskList.push(task);
  }

  updateTask(task:Task)
  {
    let tempIndex=this.taskList.findIndex(t=>t.id==task.id)
    this.taskList[tempIndex]=task;
  }

  deleteTask(task):Task[]
  {
    return this.taskList.splice(this.taskList.indexOf(task), 1);
  }
}