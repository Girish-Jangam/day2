import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripItineraryService } from '../trip-itinerary.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  guideForm: FormGroup;
  itineraryForm: FormGroup;
  destinationGuides: any[] = [];
  tripItineraries: any[] = [];
  destinationGuidesWithReviews: any[] = [];
  editingGuide: any = null;
  editingItinerary: any = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private tripItineraryService: TripItineraryService) {
    this.guideForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      summary: ['', Validators.required],
      history: ['', Validators.required],
      culture: ['', Validators.required],
      attractions: ['', Validators.required],
      lodging: ['', Validators.required],
      dining: ['', Validators.required],
      activities: ['', Validators.required],
      photos: ['', Validators.required]
    });

    this.itineraryForm = this.formBuilder.group({
      id: [''],
      destination: ['', Validators.required],
      duration: ['', Validators.required],
      activities: ['', Validators.required],
      lodging: ['', Validators.required],
      dining: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadDestinationGuides();
    this.loadTripItineraries();
    this.loadDestinationGuidesWithReviews();
  }

  loadDestinationGuides() {
    this.tripItineraryService.getDestinationGuides().subscribe(
      (data) => {
        this.destinationGuides = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load destination guides. Please try again.';
        console.error('Error loading destination guides:', error);
      }
    );
  }

  loadTripItineraries() {
    this.tripItineraryService.getTripItineraries().subscribe(
      (data) => {
        this.tripItineraries = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load trip itineraries. Please try again.';
        console.error('Error loading trip itineraries:', error);
      }
    );
  }

  loadDestinationGuidesWithReviews() {
    this.tripItineraryService.getDestinationGuides().subscribe(
      (guides) => {
        this.destinationGuidesWithReviews = guides.map(guide => ({
          ...guide,
          reviews: []
        }));
        this.destinationGuidesWithReviews.forEach(guide => {
          this.tripItineraryService.getUserReviews(guide.id).subscribe(
            (reviews) => {
              guide.reviews = reviews;
            },
            (error) => {
              console.error(`Error loading reviews for guide ${guide.id}:`, error);
            }
          );
        });
      },
      (error) => {
        this.errorMessage = 'Failed to load destination guides. Please try again.';
        console.error('Error loading destination guides:', error);
      }
    );
  }

  submitGuide() {
    if (this.guideForm.valid) {
      const guideData = this.guideForm.value;
      if (this.editingGuide) {
        this.tripItineraryService.updateDestinationGuide(guideData).subscribe(
          () => {
            this.successMessage = 'Destination guide updated successfully!';
            this.errorMessage = '';
            this.loadDestinationGuides();
            this.loadDestinationGuidesWithReviews();
            this.clearForm();
          },
          (error) => {
            this.errorMessage = 'Failed to update destination guide. Please try again.';
            this.successMessage = '';
            console.error('Error updating destination guide:', error);
          }
        );
      } else {
        this.tripItineraryService.addDestinationGuide(guideData).subscribe(
          () => {
            this.successMessage = 'Destination guide added successfully!';
            this.errorMessage = '';
            this.loadDestinationGuides();
            this.loadDestinationGuidesWithReviews();
            this.clearForm();
          },
          (error) => {
            this.errorMessage = 'Failed to add destination guide. Please try again.';
            this.successMessage = '';
            console.error('Error adding destination guide:', error);
          }
        );
      }
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }

  submitItinerary() {
    if (this.itineraryForm.valid) {
      const itineraryData = this.itineraryForm.value;
      if (this.editingItinerary) {
        this.tripItineraryService.updateTripItinerary(itineraryData).subscribe(
          () => {
            this.successMessage = 'Trip itinerary updated successfully!';
            this.errorMessage = '';
            this.loadTripItineraries();
            this.clearItineraryForm();
          },
          (error) => {
            this.errorMessage = 'Failed to update trip itinerary. Please try again.';
            this.successMessage = '';
            console.error('Error updating trip itinerary:', error);
          }
        );
      } else {
        this.tripItineraryService.addTripItinerary(itineraryData).subscribe(
          () => {
            this.successMessage = 'Trip itinerary added successfully!';
            this.errorMessage = '';
            this.loadTripItineraries();
            this.clearItineraryForm();
          },
          (error) => {
            this.errorMessage = 'Failed to add trip itinerary. Please try again.';
            this.successMessage = '';
            console.error('Error adding trip itinerary:', error);
          }
        );
      }
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }

  editGuide(guide: any) {
    this.editingGuide = guide;
    this.guideForm.patchValue(guide);
  }

  editItinerary(itinerary: any) {
    this.editingItinerary = itinerary;
    this.itineraryForm.patchValue(itinerary);
  }

  deleteGuide(id: string) {
    this.tripItineraryService.deleteDestinationGuide(id).subscribe(
      () => {
        this.successMessage = 'Destination guide deleted successfully!';
        this.errorMessage = '';
        this.loadDestinationGuides();
        this.loadDestinationGuidesWithReviews();
      },
      (error) => {
        this.errorMessage = 'Failed to delete destination guide. Please try again.';
        this.successMessage = '';
        console.error('Error deleting destination guide:', error);
      }
    );
  }

  deleteItinerary(id: string) {
    this.tripItineraryService.deleteTripItinerary(id).subscribe(
      () => {
        this.successMessage = 'Trip itinerary deleted successfully!';
        this.errorMessage = '';
        this.loadTripItineraries();
      },
      (error) => {
        this.errorMessage = 'Failed to delete trip itinerary. Please try again.';
        this.successMessage = '';
        console.error('Error deleting trip itinerary:', error);
      }
    );
  }

  deleteReview(destinationId: string, reviewId: string) {
    this.tripItineraryService.deleteUserReview(destinationId, reviewId).subscribe(
      () => {
        this.successMessage = 'Review deleted successfully!';
        this.errorMessage = '';
        this.loadDestinationGuidesWithReviews();
      },
      (error) => {
        this.errorMessage = 'Failed to delete review. Please try again.';
        this.successMessage = '';
        console.error('Error deleting review:', error);
      }
    );
  }

  clearForm() {
    this.guideForm.reset();
    this.editingGuide = null;
  }

  clearItineraryForm() {
    this.itineraryForm.reset();
    this.editingItinerary = null;
  }
}