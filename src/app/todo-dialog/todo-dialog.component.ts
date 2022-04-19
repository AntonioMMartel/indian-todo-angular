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
  action: String = 'Guardar';
  ganstas = [
    'Chimpancé de feria',
    'Mazo gansta nano',
    'Fleje malote pa',
    'Ciudadano modelo',
    'Persona genérica',
    'Orgulloso alumno de la ulpgc',
    'Yo (Persona extremadamente madura y empática)',
  ];
  taskForm!: FormGroup;

  constructor(
    private FormBuilder: FormBuilder,
    private apiTasks: ApiTodoService,
    private dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editHuevo: any
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
    if (this.editHuevo) {
      this.action = 'Editar';
      this.taskForm.controls['nombreHuevo'].setValue(
        this.editHuevo.nombreHuevo
      );
      this.taskForm.controls['formaHuevo'].setValue(this.editHuevo.formaHuevo);
      this.taskForm.controls['swagHuevo'].setValue(this.editHuevo.swagHuevo);
      this.taskForm.controls['bicepsHuevo'].setValue(
        this.editHuevo.bicepsHuevo
      );
      this.taskForm.controls['fechaHuevo'].setValue(this.editHuevo.fechaHuevo);
      this.taskForm.controls['comentariosHuevo'].setValue(
        this.editHuevo.comentariosHuevo
      );
    }
  }

  guardaHuevo() {
    // Si no editamos:
    if (!this.editHuevo) {
      if (this.taskForm.valid) {
        //console.log(this.huevoForm.value);
        this.apiTasks.postHuevo(this.taskForm.value).subscribe({
          next: (res) => {
            alert('Huevo guardado con exito');
            this.taskForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Ha habido un error guardando tu huevo');
          },
        });
      }
      // Si editamos:
    } else {
      this.apiTasks
        .updateHuevo(this.taskForm.value, this.editHuevo.id)
        .subscribe({
          next: (res) => {
            alert('Huevo modificado con éxito');
            this.taskForm.reset();
            this.dialogRef.close('update');
          },
          error: (error) => {
            alert('No se ha podido modificar el huevo');
          },
        });
    }
  }
}
