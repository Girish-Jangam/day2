import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  baseUrl = 'http://localhost:3000/api/v1/destinationGuides';
  baseUrl2 = 'http://localhost:3000/api/v1/destinationDetails';
  reviewsUrl = 'http://localhost:3000/api/v1/reviews'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  searchDestination(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getDestination(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl2}/${id}`);
  }

  submitReview(destinationId: string, review: any): Observable<any> {
    return this.http.post(`${this.baseUrl2}/${destinationId}/reviews`, review);
  }

  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.reviewsUrl);
  }

  getReviewById(id: string): Observable<any> {
    return this.http.get(`${this.reviewsUrl}/${id}`);
  }

  getSortedReviews(sortBy: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.reviewsUrl}?sortBy=${sortBy}`);
  }
}