import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Event {
  id: number | null;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string | null;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  //private apiUrl = 'http://localhost:3000/api/events';
  private apiUrl = 'https://cefedapi-arpx.onrender.com/api/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEvent(id: number): Observable<Event> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Event>(url);
  }

  createEvent(event: FormData): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  updateEvent(id: number, event: FormData): Observable<Event> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Event>(url, event);
  }

  deleteEvent(id: number): Observable<{ message: string }> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<{ message: string }>(url);
  }
}
