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

  private modalElement!: HTMLElement;
  private modalImageElement!: HTMLImageElement;
  private closeButton!: HTMLElement;

  ngAfterViewInit(): void {
    if (this.videoElement && this.videoElement.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.muted = true; // Inicialmente el video estará en mute
    }

    // Inicializar el modal
    this.modalElement = document.getElementById('imageModal')!;
    this.modalImageElement = document.getElementById('modalImage') as HTMLImageElement;
    this.closeButton = document.getElementById('closeModal')!;

    // Vincular eventos
    this.attachEventListeners();
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

  // Función para abrir el modal
  public openModal(imageSrc: string): void {
    if (this.modalElement && this.modalImageElement) {
      this.modalImageElement.src = imageSrc;
      this.modalElement.style.display = 'flex';
    }
  }

  // Función para cerrar el modal
  public closeModal(): void {
    if (this.modalElement) {
      this.modalElement.style.display = 'none';
    }
  }

  // Vincular eventos
  private attachEventListeners(): void {
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.closeModal());
    }

    // Cerrar modal con teclado (Esc)
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.closeModal();
    });
  }
}
