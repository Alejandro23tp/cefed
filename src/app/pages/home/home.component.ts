import { ContactanosComponent } from '../../components/contactanos/contactanos.component';
import { BannerCarouselComponent } from './../../banner-carousel/banner-carousel.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerCarouselComponent, ContactanosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {

}
