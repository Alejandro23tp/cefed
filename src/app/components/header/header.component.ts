import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuOpen = false; // Estado del menú principal
  subMenuOpen = false; // Estado del submenú

  constructor(private router: Router) {}

  // Función para abrir o cerrar el menú lateral
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Función para abrir o cerrar el submenú "Ministerios"
  toggleSubMenu() {
    this.subMenuOpen = !this.subMenuOpen;
  }

  // Función para cerrar el submenú y el menú lateral cuando se selecciona una categoría
  selectCategory() {
    this.menuOpen = false; // Cierra el menú lateral
    this.subMenuOpen = false; // Cierra el submenú
  }

  // Devuelve las clases para cambiar el color del header según el estado del submenú
  getHeaderClass() {
    return this.subMenuOpen ? 'bg-black text-white' : 'bg-white text-gray-700'; // Colores dinámicos según submenú
  }
}