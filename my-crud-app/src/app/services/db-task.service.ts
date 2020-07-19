import { Injectable } from "@angular/core";
import { Task } from '../models/task';
import {HttpClient} from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: "root",
})
export class DbService {
  url: string = "http://localhost:1337/api/v1/";

  constructor(private http:HttpClient) {}

  //fetch tasks list
  getTasksList() {    
    return this.http.get(this.url + 'tasks')
        .pipe(
            map((data: any) => {
               return data;
            }),
            catchError((err) => {
                throw err.error;
            })
        )
  }

  //fetch single task
  getTask(task) {    
    return this.http.get(this.url + 'tasks/' + task.id)
        .pipe(
            map((data: any) => {
               return data;
            }),
            catchError((err) => {
                throw err.error;
            })
        )
  }

  // add new task
  addTask(task: Task) {
    return this.http.post(this.url + 'tasks',task)
    .pipe(
        map((data: any) => {
            return data;
        }),
        catchError((err) => {
            throw err.error;
        })
    )
  }

  // update task
  updateTask(task: Task) {
    return this.http.put(this.url + 'tasks/' + task.id,task)
    .pipe(
        map((data: any) => {
            return data;
        }),
        catchError((err) => {
            throw err.error;
        })
    )
  }

  deleteTask(task) {
    return this.http.delete(this.url + 'tasks/' + task.id)
    .pipe(
        map((data: any) => {
            return data;
        }),
        catchError((err) => {
            throw err.error; 
        })
    )
  }

}
