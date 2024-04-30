import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})


export class MovieCardComponent {
  @Input() customClass = '';
  @Input() index = '';

 


}
