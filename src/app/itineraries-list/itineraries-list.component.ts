import { Component, OnInit } from '@angular/core';
import { TripItineraryService } from '../trip-itinerary.service';

@Component({
  selector: 'app-itineraries-list',
  templateUrl: './itineraries-list.component.html',
  styleUrls: ['./itineraries-list.component.css']
})
export class ItinerariesListComponent implements OnInit {
  userItineraries: any[] = [];
  isLoading: boolean = true; // Track loading state
  errorMessage: string = '';

  constructor(private tripItineraryService: TripItineraryService) {}

  ngOnInit(): void {
    this.isLoading = true; // Show loading indicator
    this.tripItineraryService.getUserItineraries().subscribe(
      (data: any[]) => {
        this.userItineraries = data;
        this.isLoading = false; // Hide loading indicator after data loads
      },
      (error: any) => {
        this.errorMessage = 'Failed to load itineraries. Please try again.';
        console.error('Error loading itineraries:', error);
        this.isLoading = false; // Hide loading indicator in case of error
      }
    );
  }
}