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
  accion: String = 'Guardar';
  ganstas = [
    'Chimpancé de feria',
    'Mazo gansta nano',
    'Fleje malote pa',
    'Ciudadano modelo',
    'Persona genérica',
    'Orgulloso alumno de la ulpgc',
    'Yo (Persona extremadamente madura y empática)',
  ];
  huevoForm!: FormGroup;

  constructor(
    private FormBuilder: FormBuilder,
    private apiHuevos: ApiTodoService,
    private dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editHuevo: any
  ) {
    this.huevoForm = this.FormBuilder.group({
      nombreHuevo: ['', Validators.required],
      formaHuevo: ['', Validators.required],
      swagHuevo: ['', Validators.required],
      bicepsHuevo: ['', Validators.required],
      fechaHuevo: ['', Validators.required],
      comentariosHuevo: [''],
    });
  }

  ngOnInit(): void {
    if (this.editHuevo) {
      this.accion = 'Editar';
      this.huevoForm.controls['nombreHuevo'].setValue(
        this.editHuevo.nombreHuevo
      );
      this.huevoForm.controls['formaHuevo'].setValue(this.editHuevo.formaHuevo);
      this.huevoForm.controls['swagHuevo'].setValue(this.editHuevo.swagHuevo);
      this.huevoForm.controls['bicepsHuevo'].setValue(
        this.editHuevo.bicepsHuevo
      );
      this.huevoForm.controls['fechaHuevo'].setValue(this.editHuevo.fechaHuevo);
      this.huevoForm.controls['comentariosHuevo'].setValue(
        this.editHuevo.comentariosHuevo
      );
    }
  }

  guardaHuevo() {
    // Si no editamos:
    if (!this.editHuevo) {
      if (this.huevoForm.valid) {
        //console.log(this.huevoForm.value);
        this.apiHuevos.postHuevo(this.huevoForm.value).subscribe({
          next: (respuesta) => {
            alert('Huevo guardado con exito');
            this.huevoForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Ha habido un error guardando tu huevo');
          },
        });
      }
      // Si editamos:
    } else {
      this.apiHuevos
        .updateHuevo(this.huevoForm.value, this.editHuevo.id)
        .subscribe({
          next: (res) => {
            alert('Huevo modificado con éxito');
            this.huevoForm.reset();
            this.dialogRef.close('update');
          },
          error: (error) => {
            alert('No se ha podido modificar el huevo');
          },
        });
    }
  }
}
