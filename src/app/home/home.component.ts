import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
@HostListener('window:resize', ['$event'])
export class HomeComponent implements OnInit {
  updateTableOnDialogClose: boolean = false;
  musicState = true; // Musica encendida o apagada
  showVolume = false;
  interval: any;
  speakersPulseState = false;
  selectedVolume!: number | null;

  audioElement!: HTMLAudioElement;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    document.getElementById('left-speaker')!.style.top =
      window.innerHeight - 440 + 'px';

    document.getElementById('right-speaker')!.style.top =
      window.innerHeight - 440 + 'px';

    document.getElementById('right-speaker')!.style.left =
      window.innerWidth - 260 + 'px';

    this.audioElement = <HTMLAudioElement>document.getElementById('audio');
    this.audioElement.volume = 0.1;
    document.getElementsByTagName('audio')[0].play();
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

  showVolumeBar() {
    this.showVolume = true;
    document.getElementById('volume')!.style.display = 'block';
    document.getElementById('volume')!.style.opacity = '1';
  }

  hideVolumeBar() {
    this.showVolume = false;
    document.getElementById('volume')!.style.display = 'none';
    document.getElementById('volume')!.style.opacity = '0';
  }

  changeVolume() {
    this.audioElement.volume = this.selectedVolume! / 100;
  }
}
