import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'Indian todo list';
  updateTableOnDialogClose: boolean = false;
  musicState = false;

  constructor(public dialog: MatDialog) {}
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

  toggleMUSICOTE(image: any): void {
    if (!this.musicState) {
      document.getElementsByTagName('audio')[0].play();
      this.musicState = !this.musicState;
    } else {
      document.getElementsByTagName('audio')[0].pause();
      this.musicState = !this.musicState;
    }
  }
}
