import { Component, OnInit } from "@angular/core";
import { Task } from "src/app/models/task";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormComponent } from "../task-form/form/form.component";
import { DbService } from 'src/app/services/db-task.service';

// This component is form tasks list getting from API calls
@Component({
  selector: "app-task-list",
  templateUrl: "./task-list-db.component.html",
  styleUrls: ["./task-list-db.component.css"],
})
export class TaskListDbComponent implements OnInit {
  taskList  = [];
  searchText: string = "";
  showErrMessage=false;
  showSuceessMessage=false;
  successMessage='';
  errorMessage='';

  constructor(private taskData: DbService, private modalService: NgbModal) {}

  ngOnInit() {
    this.getTasks();    
  }

  // Edit task Popup function call
  editTask(task:Task)
  {
    const modalRef = this.modalService.open(FormComponent);
    modalRef.componentInstance.title = {type:'Edit Task'};
    modalRef.componentInstance.task = task;

    modalRef.result.then(
      (response) => {
        this.updateTask(response);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  // Add task Popup function call
  addTask() {
    const modalRef = this.modalService.open(FormComponent);
    modalRef.componentInstance.title = {type:'Add Task'};

    modalRef.result.then(
      (response) => {
        this.addNewTask(response);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  // Get list of tasks
  getTasks()
  {
    this.taskData.getTasksList()
    .subscribe(response=>{
      this.taskList=response;
    },error=>{
      this.showMsg(error.message,'error')
    });
  }

  // Delete task 
  deleteTask(task) {
    this.taskData.deleteTask(task)
      .subscribe(response=>{
        this.getTasks();
        this.showMsg(response.message,'success')
      },error=>{
        this.showMsg(error.message,'error')
      });
  }

  // Add New task
  addNewTask(task: Task) {
    this.taskData.addTask(task)
      .subscribe(response=>{
        this.getTasks();
        this.showMsg(response.message,'success')
      },error=>{
        this.showMsg(error.message,'error')
      })
  }

  //Update task
  updateTask(task:Task)
  {
    this.taskData.updateTask(task)
    .subscribe(response=>{
      this.getTasks();
      this.showMsg(response.message,'success')
    },error=>{
      this.showMsg(error.message,'error')
    });
  }

  // Success/Error Message
  showMsg(msg,type)
  {
    if(type=='success'){
      this.showSuceessMessage=true
      this.successMessage=msg;
    }      
    else
    {
      this.showErrMessage=true
      this.errorMessage=msg;
    }      

      setTimeout(() => {
        this.showSuceessMessage=false;
        this.showErrMessage=false;
        this.successMessage='';
        this.errorMessage='';
      }, 7000);
  }
}
