import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Task } from "src/app/models/task";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
  @Input() task: Task;
  @Input() title: string;
  taskForm: FormGroup;
  submitted = false;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id : 0,
      description: ["", Validators.required],
      priority: ["Low"],
      status: ["Not Started"],
    });
  }

  get f() {
    return this.taskForm.controls;
  }

  ngOnInit() {
    //In case of update task form will get initialize
    if (this.task !== undefined) {
      this.taskForm.setValue(this.task);
    }
  }

  onSubmit() {
    this.submitted = true;

    //If form is valid submit
    if (this.taskForm.valid) {        
      this.activeModal.close(this.taskForm.value);
      this.taskForm.reset();   
    }
  }
}
