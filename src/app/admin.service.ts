import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:3000'; // JSON Server or backend URL

  constructor(private http: HttpClient) {}

  getDestinations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/destinationGuides`);
  }

  getItineraries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tripItineraries`);
  }

  addDestination(destination: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/destinationGuides`, destination);
  }

  updateDestination(destination: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/destinationGuides/${destination.id}`, destination);
  }

  deleteDestination(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/destinationGuides/${id}`);
  }

  addItinerary(itinerary: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tripItineraries`, itinerary);
  }

  updateItinerary(itinerary: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/tripItineraries/${itinerary.id}`, itinerary);
  }

  deleteItinerary(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tripItineraries/${id}`);
  }
}