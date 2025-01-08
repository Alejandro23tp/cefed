import { Component, OnInit, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EventsService, Event } from '../../services/events.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export default class EventosComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  categories: { id: number, name: string }[] = [];
  selectedCategory: number | null = null;
  newEvent: Event = { id: null, title: '', date: '', time: '', location: '', category: '', image: null, description: '' };
  imageFile: File | null = null;
  showPasswordField: boolean = false;
  showEventForm: boolean = false;
  password: string = '';
  eventToDeleteId: number | null = null;
  fullScreenImageUrl: string | null = null; // Nueva propiedad para imagen a pantalla completa


  private eventsService = inject(EventsService);

  async ngOnInit() {
    await this.fetchEvents();
    this.categories = this.extractCategories();
  }

  // Función para mostrar el formulario de creación de evento
  showCreateEventForm() {
    this.showEventForm = true;
  }

  // Ocultar formulario de creación de evento
  cancelCreateEvent() {
    this.showEventForm = false;
    this.newEvent = { id: null, title: '', date: '', time: '', location: '', category: '', image: null, description: '' };
  }

  // Mostrar imagen en tamaño completo
  showFullScreenImage(imageUrl: string) {
    this.fullScreenImageUrl = imageUrl;
  }

  // Cerrar la imagen en tamaño completo
  closeFullScreenImage() {
    this.fullScreenImageUrl = null;
  }

  // Función para crear un evento
  async createEvent() {
    if (this.password === 'FeenDios07JP') {
      if (this.newEvent.title && this.newEvent.date && this.newEvent.time && this.newEvent.location && this.newEvent.category) {
        const formData = new FormData();
        formData.append('title', this.newEvent.title);
        formData.append('date', this.newEvent.date);
        formData.append('time', this.newEvent.time);
        formData.append('location', this.newEvent.location);
        formData.append('category', this.newEvent.category);
        formData.append('description', this.newEvent.description);
        if (this.imageFile) {
          formData.append('image', this.imageFile);
        }

        try {
          const response = await firstValueFrom(this.eventsService.createEvent(formData));
          console.log('Nuevo evento creado:', response);
          this.events.push(response);
          this.filterEvents();
          this.showEventForm = false; // Ocultar el formulario después de crear
        } catch (error) {
          console.error('Error creando el evento', error);
        }
      } else {
        alert('Por favor, complete todos los campos');
      }
    } else {
      alert('Contraseña incorrecta');
    }
  }

// Función para filtrar los eventos por categoría seleccionada
  filterEvents() {
    if (this.selectedCategory === null || this.selectedCategory === 1) { // Si se selecciona "Todos" o no hay categoría seleccionada
      this.filteredEvents = this.events; // Mostrar todos los eventos
    } else {
      const category = this.categories.find(cat => cat.id === this.selectedCategory);
      this.filteredEvents = this.events.filter(event => event.category === category?.name); // Filtrar según la categoría seleccionada
    }
  }


  // Función para mostrar la contraseña al eliminar un evento
  showDeletePassword(eventId: number) {
    this.showPasswordField = true;
    this.eventToDeleteId = eventId;
  }

  // Función para cancelar eliminación de evento
  cancelDelete() {
    this.showPasswordField = false;
    this.password = '';
    this.eventToDeleteId = null;
  }

  // Función para confirmar la eliminación del evento
  confirmDelete() {
    if (this.password === 'FeenDios07JP') {
      this.deleteEvent(this.eventToDeleteId!);
    } else {
      alert('Contraseña incorrecta');
    }
  }

  

  // Función para eliminar el evento
  async deleteEvent(id: number) {
    try {
      await firstValueFrom(this.eventsService.deleteEvent(id));
      console.log('Evento eliminado:', id);
      this.events = this.events.filter(event => event.id !== id);
      this.filterEvents();
      this.cancelDelete();
    } catch (error) {
      console.error('Error eliminando evento', error);
    }
  }

  // Función para cargar la imagen seleccionada
  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
  }

  extractCategories() {
    const extraCategories = ['Retiros', 'Evangelismo', 'Adoración']; // Categorías adicionales
    const allCategories = [
      ...new Set([
        'Todos', // Garantizamos que "Todos" siempre esté presente
        ...this.events.map(event => event.category), // Extrae categorías únicas de los eventos
        ...extraCategories // Agrega categorías adicionales
      ])
    ];
  
    return allCategories.map((category, index) => ({
      id: index + 1,
      name: category
    }));
  }
  



  // Función para seleccionar la categoría
  setSelectedCategory(categoryId: number) {
    this.selectedCategory = categoryId;
    this.filterEvents();
  }

  // Función para obtener los eventos
  async fetchEvents() {
    try {
      const response = await firstValueFrom(this.eventsService.getEvents());
      this.events = response;
      this.filterEvents();
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  // Nueva función para manejar el botón "Ver"
viewEvent(event: Event) {
  // Aquí puedes decidir qué acción realizar:
  // Opción 1: Redirigir a una página específica del evento
  console.log('Ver evento:', event);
  alert(`Detalles del evento:\n\nTítulo: ${event.title}\nDescripción: ${event.description}\nFecha: ${event.date}\nHora: ${event.time}\nLugar: ${event.location}`);
  
  // Opción 2: Implementar un modal si quieres mostrar la información en la misma página
  // this.fullScreenImageUrl = event.image;
  // También podrías usar alguna librería como Angular Material Dialog o Bootstrap Modal
}

}
