import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export default class AboutComponent {
  slides = [
    {
      image: '/imagenes/QuienesS1.jpg',
      alt: 'Somos un grupo unido en servicio al pueblo de Dios y de la sociedad',
    },
    {
      image: '/imagenes/QuienesS2.jpg',
      alt: ' Hemos comprendido que servir no es solo un privilegio, es también una bendición ',
    },
    {
      image: '/imagenes/QuienesS3.jpg',
      alt: 'Y nos sentimos honrados en hacerlo y por que creemos que el CEFED no es solo una comunidad, '
    },
    {
      image: '/imagenes/QuienesS4.jpg',
      alt: 'Es una familia que crece sana y majestuosa, con pastores visionarios y esforzados; '
    },
    {
      image: '/imagenes/QuienesS5.jpg',
      alt: 'Con amor, entrega compromiso y responsabilidad '
    },
    {
      image: '/imagenes/QuienesS6.jpg',
      alt: 'Cada día laboramos para engrandecer el Reino de Dios.'
    },
  ];
  currentIndex = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    }, 5000);
  }

  onDotClick(index: number): void {
    this.currentIndex = index;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  getCarouselTransform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  getSlideTransform(index: number): string {
    return this.currentIndex === index ? 'scale(1.05)' : 'scale(1)';
  }
}
