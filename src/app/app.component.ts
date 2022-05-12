import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'Indian todo list';
  updateTableOnDialogClose: boolean = false;
  items: Observable<any[]>;

  constructor(public dialog: MatDialog, firestore: AngularFirestore) {
    this.items = firestore.collection('tasks').valueChanges();
  }

  openDialog() {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '50vw',
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado === 'save' || resultado === 'update') {
        this.updateTableOnDialogClose = true;
      }
    });
  }
}
