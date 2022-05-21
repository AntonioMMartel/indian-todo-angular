import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  updateTableOnDialogClose: boolean = false;

  constructor(public dialog: MatDialog) {}
}
