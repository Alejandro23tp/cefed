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

  // Propiedad para el modal
  selectedEvent: Event | null = null;
  
  private eventsService = inject(EventsService);

  async ngOnInit() {
    await this.fetchEvents();
    this.categories = this.extractCategories();
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

  // Función para abrir el modal con los detalles del evento
  openEventModal(event: Event) {
    this.selectedEvent = event;
  }

  // Función para cerrar el modal
  closeEventModal() {
    this.selectedEvent = null;
  }

  // Función para extraer las categorías de los eventos
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
}
