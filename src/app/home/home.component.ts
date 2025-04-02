import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../destination.service';
import { SharedService } from '../shared.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  destinations$: Observable<any[]> | undefined;
  slides: string[] = [
    '../../assets/IMAGES/BALI/balihotel5.jpg',
    '../../assets/IMAGES/Switzerland/chapel-bridge-lucerne.jpg',
    '../../assets/IMAGES/london/caption.jpg',
    '../../assets/IMAGES/london/garden-view-hotel.jpg'
  ];
  currentSlide: number = 0;
  currentSlideTitle: string = '';
  searchTerm: string = '';
  currentBgColor: string = '#007bff';
  bgColors: string[] = ['#007bff', '#ff6347', '#32cd32'];
  intervalId: any;

  constructor(
    private destinationService: DestinationService,
    private sharedService: SharedService,
    private router:Router
  ) {}

  ngOnInit() {
    this.destinations$ = this.sharedService.filteredDestinations$;
    this.startCarousel();
    this.changeSearchBarBackground();
  }

  // Carousel logic
  startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.currentSlideTitle = this.getSlideTitle();
    }, 5000);
  }

  getSlideTitle(): string {
    const destinations = this.slides.map((_, i) => ({
      title: this.getSlideName(i)
    }));
    return destinations[this.currentSlide].title || '';
  }

  getSlideName(index: number): string {
    const slideNames = [
      'Bali Paradise',
      'Swiss Alps',
      'London Charm',
      'Paris Elegance'
    ];
    return slideNames[index] || '';
  }

  // Search functionality
  search() {
    this.sharedService.setSearchQuery(this.searchTerm);
  }

  navigateToDestination(id: string) {
    this.router.navigate(['/destination', id]);
  }

  // Background color animation
  changeSearchBarBackground() {
    setInterval(() => {
      this.currentBgColor = this.bgColors[
        Math.floor(Math.random() * this.bgColors.length)
      ];
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}