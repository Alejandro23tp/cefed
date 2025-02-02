import { Component } from '@angular/core';
import { AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-damas',
  standalone: true,
  imports: [],
  templateUrl: './damas.component.html',
  styleUrl: './damas.component.scss'
})
export default class DamasComponent {
  private modalElement!: HTMLElement;
  private modalImageElement!: HTMLImageElement;
  private closeButton!: HTMLElement;

  ngAfterViewInit(): void {
    this.modalElement = document.getElementById('imageModal')!;
    this.modalImageElement = document.getElementById('modalImage') as HTMLImageElement;
    this.closeButton = document.getElementById('closeModal')!;

    this.attachEventListeners();
  }

  ngOnDestroy(): void {
    this.detachEventListeners();
  }

  private attachEventListeners(): void {
    const images = document.querySelectorAll<HTMLImageElement>('img[data-image-index]');
    images.forEach((img) =>
      img.addEventListener('click', () => this.openModal(img.src))
    );

    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.closeModal());
    }

    document.addEventListener('keydown', this.handleKeydown);
  }

  private detachEventListeners(): void {
    const images = document.querySelectorAll<HTMLImageElement>('img[data-image-index]');
    images.forEach((img) =>
      img.removeEventListener('click', () => this.openModal(img.src))
    );

    if (this.closeButton) {
      this.closeButton.removeEventListener('click', () => this.closeModal());
    }

    document.removeEventListener('keydown', this.handleKeydown);
  }

  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') this.closeModal();
  };

  public openModal(imageSrc: string): void {
    if (this.modalElement && this.modalImageElement) {
      this.modalImageElement.src = imageSrc;
      this.modalElement.style.display = 'flex';
    }
  }

  public closeModal(): void {
    if (this.modalElement) {
      this.modalElement.style.display = 'none';
    }
  }
}
