import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private reviewSubject= new BehaviorSubject<any[]>([]);
  reviews$=this.reviewSubject.asObservable();
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
    return this.http.put(`${this.reviewsUrl}/${destinationId}`, review).pipe(tap((response: any)=>{
      this.reviewSubject.next(response.reviews);
    }));
  }

  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl2);
  }


}