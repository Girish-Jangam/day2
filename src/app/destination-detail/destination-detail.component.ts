import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinationService } from '../destination.service';
import { interval } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface DestinationDetails {
  id: string;
  title: string;
  description: string;
  photos: string[];
  reviews: Review[];
  selectImage: string | null;
  history: string;  // Add the 'history' property
  culture: string;
}

@Component({
  selector: 'app-destination-detail',
  templateUrl: './destination-detail.component.html',
  styleUrls: ['./destination-detail.component.css'],
})
export class DestinationDetailComponent implements OnInit, OnDestroy {
  destination?: DestinationDetails;
  tripid: string = '';
  photos: string[] = [];
  reviewForm: FormGroup;
  reviews: Review[] = []; // Array for storing reviews
  newReview: Review = { user: '', rating: 5, comment: '' }; // For capturing the new review
  selectedImage: string | null = null;
  isPaused: boolean = false;
  history: any="";  // Add history
  culture: any="";  // Add culture
  intervalId: any;
  currentIndex: number = 0;
  showReviewForm: boolean = false; // Control visibility of review form

  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationService,
    private fb: FormBuilder 
  ) {
    this.reviewForm = this.fb.group({
      user: [{ value: 'user123', disabled: true }, Validators.required], // Set the username to be disabled
      rating: [5, Validators.required], // Rating field (default value 5)
      comment: ['', Validators.required], // Comment field (required)
    });
  }

  ngOnInit() {
    this.getAllData();
    this.getProductDetails(this.tripid);
    this.searchDestination();
    this.startAutoScroll();
  }

 
  getAllData() {
    let tripid = this.route.snapshot.params['id'];
    this.route.params.subscribe((params) => {
      this.tripid = params['id'];
    });
  }

  getProductDetails(tripid: string) {
    this.destinationService.getDestination(tripid).subscribe((res) => {
      this.destination = res;
      this.reviews = res.reviews || []; // Assign reviews from the API response
      
      console.log('dkjfhskfkdsflkdsf'+this.destination);
    });
  }

  openReviewForm() {
    this.showReviewForm = true;
  }

  closeReviewForm() {
    this.showReviewForm = false;
  }

  submitReview() {
    if (this.newReview.user && this.newReview.comment && this.newReview.rating) {
      // Simulate sending the review to an API
      this.destinationService.submitReview(this.tripid, this.newReview).subscribe((newReview) => {
        this.reviews.push(newReview); // Add the new review to the list
        this.newReview = { user: '', rating: 5, comment: '' }; // Reset the form
        this.closeReviewForm(); // Close the review form
      });
    }
  }
  openLightbox(){
    this.selectedImage=this.photos[this.currentIndex];
  }
  startAutoScroll(){
    this.intervalId=setInterval(()=>
    {
      if(!this.isPaused){
        this.nextImage();
      }
    },2500)
  }

  stopAutoScroll(){
    this.isPaused=true;
    clearInterval(this.intervalId);
  }

nextImage()
{
  this.currentIndex=(this.currentIndex + 1)%this.photos.length;
}
  closeLightbox(){
    this.selectedImage=null;
    this.isPaused=false;
    this.startAutoScroll();
  }

  searchDestination(){
    this.destinationService.searchDestination().subscribe((data) => {
      // console.log(this.destinations);
      // this.filterDestination = ;  
      
      this.photos = data.filter(item => item.id==this.tripid).map(item => item.photos)[0];
      this.history = data.filter(item => item.id==this.tripid).map(item => item.history);  // Set the history from the response
      this.culture = data.filter(item => item.id==this.tripid).map(item => item.culture); 
      console.log(data) // Set the culture from the response
      
      
    }
    )

  }
  ngOnDestroy(){
    clearInterval(this.intervalId);
  }

  
  // Scroll left
  scrollLeft() {
    const container = document.querySelector('.reviews-container') as HTMLElement;
    container.scrollBy({
      left: -300, // Adjust this value as per your layout
      behavior: 'smooth'
    });
  }

  // Scroll right
  scrollRight() {
    const container = document.querySelector('.reviews-container') as HTMLElement;
    container.scrollBy({
      left: 300, // Adjust this value as per your layout
      behavior: 'smooth'
    });
  }

}
