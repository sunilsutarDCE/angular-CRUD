import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/services/task.service";
import { Task } from "src/app/models/task";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormComponent } from "../task-form/form/form.component";

// This component is form tasks list getting from JSON
@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.css"],
})
export class TaskListComponent implements OnInit {
  taskList: Task[] = [];
  searchText: string = "";
  showErrMessage=false;
  showSuceessMessage=false;
  successMessage='';
  errorMessage='';

  constructor(private taskData: TaskService, private modalService: NgbModal) {}

  ngOnInit() {
    this.taskList = this.taskData.getTasksList();
  }

  // Edit task Popup function call
  editTask(task:Task)
  {
    const modalRef = this.modalService.open(FormComponent);
    modalRef.componentInstance.title = {type:'Edit Task'};
    modalRef.componentInstance.task = task;

    modalRef.result.then(
      (result) => {
        this.updateTask(result);
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  // Add task Popup function call
  addTask() {
    const modalRef = this.modalService.open(FormComponent);
    modalRef.componentInstance.title = {type:'Add Task'};

    modalRef.result.then(
      (result) => {
        result.id = this.taskList.length + 1;

        this.addNewTask(result);
      },
      (reason) => {
        this.showMsg(reason,'error')
      }
    );
  }

  // Delete task 
  deleteTask(task) {
    this.showMsg('Successfully deleted task #' + task.id,'success')
    this.taskData.deleteTask(task);
  }

  // Add new task
  addNewTask(task: Task) {
    this.taskData.addTask(task);
    this.showMsg('Successfully added task #' + task.id,'success')
  }

  // Update task
  updateTask(task:Task)
  {
    this.taskData.updateTask(task);
    this.showMsg('Successfully updated task #' + task.id,'success')
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
