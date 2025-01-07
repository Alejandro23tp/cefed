import { HttpClient } from '@angular/common/http';
import { ContactanosComponent } from '../../components/contactanos/contactanos.component';
import { BannerCarouselComponent } from './../../banner-carousel/banner-carousel.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.iniciarServidor_API();
  }

  iniciarServidor_API() {
    const url = 'https://cefedapi-arpx.onrender.com/';
    this.http.get(url).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
