import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinationService } from '../destination.service';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit {
  review: any;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationService
  ) {}

  ngOnInit() {
    const reviewId = this.route.snapshot.paramMap.get('id');
    if (reviewId) {
      this.destinationService.getReviewById(reviewId).subscribe(
        (data: any) => {
          this.review = data;
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching review:', error);
          this.isLoading = false;
        }
      );
    }
  }
}