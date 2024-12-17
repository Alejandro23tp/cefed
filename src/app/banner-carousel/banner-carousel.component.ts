import { Component } from '@angular/core';

@Component({
  selector: 'app-banner-carousel',
  standalone: true,
  imports: [],
  templateUrl: './banner-carousel.component.html',
  styleUrl: './banner-carousel.component.scss'
})
export class BannerCarouselComponent {
  slides: HTMLElement[] = [];
  dots: HTMLElement[] = [];
  currentIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.slides = Array.from(document.querySelectorAll('#bannerCarousel > div')) as HTMLElement[];
    this.dots = Array.from(document.querySelectorAll('[data-target]')) as HTMLElement[];

    this.updateSlides(this.currentIndex);

    // Intervalo para cambio automático
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.updateSlides(this.currentIndex);
    }, 5000);
  }

  updateSlides(index: number): void {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('hidden', i !== index);
    });
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('bg-white', i === index);
      dot.classList.toggle('bg-gray-400', i !== index);
    });
  }

  onDotClick(index: number): void {
    this.currentIndex = index;
    this.updateSlides(this.currentIndex);
  }
}
