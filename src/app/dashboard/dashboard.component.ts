import { Component, OnInit, OnDestroy } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { OuridentityComponent } from "../ouridentity/ouridentity.component";
import { WhatourclientsayComponent } from "../whatourclientsay/whatourclientsay.component";
import { RouterModule } from '@angular/router';
import { OurdoctorsComponent } from "../ourdoctors/ourdoctors.component";
import { OpdtimingdashboardComponent } from "../opdtimingdashboard/opdtimingdashboard.component";
import { DashboardCountsComponent } from "../dashboard-counts/dashboard-counts.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [OuridentityComponent, WhatourclientsayComponent, RouterModule, OurdoctorsComponent, OpdtimingdashboardComponent, DashboardCountsComponent],
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2) { }

  currentIndex = 0;
  slides = [
    '../../assets/Slider1.png',
    '../../assets/Slider2.png',
    '../../assets/Slider3.png',
    '../../assets/Slider4.png'
  ];
  intervalId: any;

  ngOnInit() {
    this.showSlide(this.currentIndex);

    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);

    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach((card, index) => {
      if (index < 14) {
        this.renderer.setStyle(card, 'animation-delay', `${index * 0.5}s`);
        this.renderer.setStyle(card, '--card-index', `${index}`);
      } else {
        this.renderer.setStyle(card, 'opacity', '1');
      }
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  showSlide(index: number) {
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(this.currentIndex);
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currentIndex);
  }
}
