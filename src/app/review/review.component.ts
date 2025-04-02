import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestinationService } from '../destination.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews: any[] = [];
  showReviewForm: boolean = false;
  reviewForm: FormGroup;
  @ViewChild('reviewsContainer') reviewsContainer!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private destinationService: DestinationService,
    private router: Router
  ) {
    this.reviewForm = this.fb.group({
      user: ['', Validators.required],
      rating: [5, Validators.required],
      comment: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchReviews();
  }

  fetchReviews() {
    this.destinationService.getReviews().subscribe(
      (data) => {
        this.reviews = data;
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }

  openReviewForm() {
    this.showReviewForm = true;
  }

  closeReviewForm() {
    this.showReviewForm = false;
    this.reviewForm.reset({ user: '', rating: 5, comment: '' });
  }

  submitReview() {
    if (this.reviewForm.valid) {
      const newReview = this.reviewForm.value;
      this.destinationService.submitReview('dummyDestinationId', newReview).subscribe(
        (data) => {
          this.reviews.push(data);
          this.closeReviewForm();
        },
        (error) => {
          console.error('Error submitting review:', error);
        }
      );
    }
  }

  scrollLeft() {
    this.reviewsContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.reviewsContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }

  sortReviews(sortBy: string) {
    this.destinationService.getSortedReviews(sortBy).subscribe(
      (data) => {
        this.reviews = data;
      },
      (error) => {
        console.error('Error sorting reviews:', error);
      }
    );
  }

  viewReviewDetail(reviewId: string) {
    this.router.navigate(['/review', reviewId]);
  }
}