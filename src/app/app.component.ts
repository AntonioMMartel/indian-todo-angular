import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
@HostListener('window:resize', ['$event'])
export class AppComponent {
  title = 'Indian todo list';
  updateTableOnDialogClose: boolean = false;
  musicState = false; // Musica encendida o apagada

  interval: any;
  speakersPulseState = false; // Si el

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    document.getElementById('left-speaker')!.style.top =
      window.innerHeight - 440 + 'px';

    document.getElementById('right-speaker')!.style.top =
      window.innerHeight - 440 + 'px';

    document.getElementById('right-speaker')!.style.left =
      window.innerWidth - 260 + 'px';
  }

  onResize(event: any) {
    document.getElementById('left-speaker')!.style.top =
      window.innerHeight - 440 + 'px';

    document.getElementById('right-speaker')!.style.top =
      window.innerHeight - 440 + 'px';

    document.getElementById('right-speaker')!.style.left =
      window.innerWidth - 260 + 'px';
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

  toggleMUSICOTE(): void {
    if (!this.musicState) {
      document.getElementById('right-speaker')!.style.opacity = '1';
      document.getElementById('left-speaker')!.style.opacity = '1';
      document.getElementsByTagName('audio')[0].play();
      this.musicState = !this.musicState;
      this.startSpeakerPulse();
    } else {
      document.getElementById('right-speaker')!.style.opacity = '0';
      document.getElementById('left-speaker')!.style.opacity = '0';
      document.getElementsByTagName('audio')[0].pause();
      this.musicState = !this.musicState;
      this.stopSpeakerPulse();
    }
  }

  startSpeakerPulse() {
    this.interval = setInterval(async () => {
      document.getElementById('left-speaker')!.style.transform = 'scale(1.05)';
      document.getElementById('right-speaker')!.style.transform = 'scale(1.05)';
      await this.sleep(75);
      document.getElementById('left-speaker')!.style.transform = 'scale(1)';
      document.getElementById('right-speaker')!.style.transform = 'scale(1)';
    }, 606);
  }

  stopSpeakerPulse() {
    clearInterval(this.interval);
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
