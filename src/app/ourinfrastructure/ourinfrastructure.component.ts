import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-ourinfrastructure',
  standalone: true,
  imports: [],
  templateUrl: './ourinfrastructure.component.html',
  styleUrl: './ourinfrastructure.component.css'
})
export class OurinfrastructureComponent {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    
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
  
}
