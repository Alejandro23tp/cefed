import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';

@Component({
  selector: 'app-jovenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jovenes.component.html',
  styleUrl: './jovenes.component.scss'
})
export default class JovenesComponent {

  @ViewChild('videoElement') videoElement: ElementRef<HTMLVideoElement> | undefined;
  isMuted: boolean = true;  // Estado de mute
  isPlaying: boolean = true;  // Estado de reproducción

  ngAfterViewInit(): void {
    if (this.videoElement && this.videoElement.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.muted = true; // Inicialmente el video estará en mute
    }
  }

  // Función para alternar el mute
  toggleMute(): void {
    if (this.videoElement && this.videoElement.nativeElement) {
      const video = this.videoElement.nativeElement;
      this.isMuted = !this.isMuted;
      video.muted = this.isMuted;
    }
  }

  // Función para alternar entre play y pause
  togglePlayPause(): void {
    if (this.videoElement && this.videoElement.nativeElement) {
      const video = this.videoElement.nativeElement;
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }
  }
}
