import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiTodoService } from '../api-todo.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoTableUpdaterService } from '../todo-table-updater.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.sass'],
})
export class TodoDialogComponent {
  action: String = 'Save';
  familyMembers = [
    'Indian father Mehdi',
    'Indian child Abdam',
    'Indian camel pet Brownie',
    'Indian wife Anjali',
  ];

  difficulties = [
    'Easy',
    'Medium',
    'Hard',
    'Impossible',
    'Hell',
    'Press banca 200kg',
  ];
  taskForm!: FormGroup;

  tableUpdaterState = 'Element being added';
  tableUpdaterStateActual = new BehaviorSubject('');

  constructor(
    private FormBuilder: FormBuilder,
    private apiTasks: ApiTodoService,
    private dialogRef: MatDialogRef<TodoDialogComponent>,
    private todoTableUpdater: TodoTableUpdaterService,
    @Inject(MAT_DIALOG_DATA) public editTask: any
  ) {
    this.taskForm = this.FormBuilder.group({
      taskName: ['', Validators.required],
      taskParticipants: ['', Validators.required],
      taskDifficulty: ['', Validators.required],
      taskPriority: ['', Validators.required],
      taskDeadline: ['', Validators.required],
      taskComments: [''],
    });
  }

  ngOnInit(): void {
    if (this.editTask) {
      this.action = 'Edit';
      this.taskForm.controls['taskName'].setValue(this.editTask.taskName);
      this.taskForm.controls['taskParticipants'].setValue(
        this.editTask.taskParticipants
      );
      this.taskForm.controls['taskDifficulty'].setValue(
        this.editTask.taskDifficulty
      );
      this.taskForm.controls['taskPriority'].setValue(
        this.editTask.taskPriority
      );
      this.taskForm.controls['taskDeadline'].setValue(
        this.editTask.taskDeadline
      );
      this.taskForm.controls['taskComments'].setValue(
        this.editTask.taskComments
      );
    }
    this.todoTableUpdater.elementBeingAddedStateActual.subscribe(
      (state) => this.tableUpdaterStateActual.next(state) // Guardamos el estado del camello
    );
  }

  async saveData() {
    // Si no editamos:
    if (!this.editTask) {
      if (this.taskForm.valid) {
        let docRef = this.apiTasks.postData(this.taskForm.value);
        if (await docRef) {
          alert('Task has been saved');
          this.taskForm.reset();
          this.dialogRef.close('save');
          this.todoTableUpdater.updateElementBeingAddedState(
            this.tableUpdaterState
          );
        } else {
          alert('Task could not be saved');
        }
      }
      // Si editamos:
    } else {
      if (
        await this.apiTasks.updateData(this.taskForm.value, this.editTask.id)
      ) {
        alert('Task modified succesfully');
        this.taskForm.reset();
        this.dialogRef.close('update');
      } else {
        alert('Task could not be modified');
      }
    }
  }
}
