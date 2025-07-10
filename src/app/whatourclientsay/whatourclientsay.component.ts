import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-whatourclientsay',
  standalone: true,
  imports: [],
  templateUrl: './whatourclientsay.component.html',
  styleUrl: './whatourclientsay.component.css'
})
export class WhatourclientsayComponent {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    
    const cardElements = document.querySelectorAll('.review-card');
    cardElements.forEach((card, index) => {
      this.renderer.setStyle(card, 'animation-delay', `${index * 0.5}s`);
    });
  }

}
