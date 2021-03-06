import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { ApiTodoService } from '../api-todo.service';
import { TodoTableUpdaterService } from '../todo-table-updater.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.sass'],
})
export class TodoTableComponent implements OnInit {
  @Input() updateTableOnDialogClose!: boolean;

  displayedColumns: string[] = [
    'taskName',
    'taskParticipants',
    'taskDifficulty',
    'taskPriority',
    'taskDeadline',
    'taskComments',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tableUpdaterState = 'No element being added';
  tableUpdaterStateActual = new BehaviorSubject('');

  constructor(
    private todoApi: ApiTodoService,
    public dialog: MatDialog,
    private todoTableUpdater: TodoTableUpdaterService
  ) {}

  ngOnInit(): void {
    this.getAllData();
    this.todoTableUpdater.elementBeingAddedStateActual.subscribe(
      (state) => this.tableUpdaterStateActual.next(state) // Guardamos el estado del camello
    );
    this.tableUpdaterStateActual.subscribe(() => {
      if (this.tableUpdaterStateActual.getValue() == 'Element being added') {
        this.getAllData();
        this.todoTableUpdater.updateElementBeingAddedState(
          this.tableUpdaterState
        );
      }
    });
  }

  async getAllData() {
    let allData = await this.todoApi.getAllData();
    if (allData) {
      this.dataSource = new MatTableDataSource(allData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      alert('Data could not be found');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editData(row: any) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '50vw',
      data: row,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllData();
    });
  }

  async deleteData(id: string) {
    if (!confirm('This task will be wiped out of existence')) return;
    if (await this.todoApi.deleteData(id)) {
      alert('Task has been deleted.');
    } else {
      alert(
        'Task could not be deleted probably because of spagetti code reasons (or connection issues)'
      );
    }

    this.getAllData();
  }

  min(first: number, second: number) {
    return first < second ? first : second;
  }
}
