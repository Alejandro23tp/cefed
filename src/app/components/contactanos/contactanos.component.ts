import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.scss'
})
export class ContactanosComponent {
  formData = {
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: ''
  };

  constructor(private http: HttpClient) {}

  enviarMensaje() {
    //const url = 'http://localhost:3000/api/telegram/contact';
    const url = 'https://cefedapi-arpx.onrender.com/api/telegram/contact';
    this.http.post(url, this.formData).subscribe(
      response => {
        alert('Mensaje enviado');
      },
      error => {
        alert('Hubo un error al enviar el mensaje: ' + error.message);
      }
    );
  }
}
