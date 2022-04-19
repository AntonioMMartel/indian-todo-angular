import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiTodoService } from '../api-todo.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  constructor(
    private FormBuilder: FormBuilder,
    private apiTasks: ApiTodoService,
    private dialogRef: MatDialogRef<TodoDialogComponent>,
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
  }

  saveData() {
    // Si no editamos:
    if (!this.editTask) {
      if (this.taskForm.valid) {
        this.apiTasks.postData(this.taskForm.value).subscribe({
          next: (res) => {
            alert('Task has been saved');
            this.taskForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Task could not be saved');
          },
        });
      }
      // Si editamos:
    } else {
      this.apiTasks
        .updateData(this.taskForm.value, this.editTask.id)
        .subscribe({
          next: (res) => {
            alert('Task modified succesfully');
            this.taskForm.reset();
            this.dialogRef.close('update');
          },
          error: (error) => {
            alert('Task could not be modified');
          },
        });
    }
  }
}
