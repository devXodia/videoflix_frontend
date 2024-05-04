import { Component, ElementRef, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Movie } from '../../interfaces/MovieData.interface';

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
  @Output() openMovie = new EventEmitter<Movie>();
  @Input() title = '';
  @Input() description = '';

  @Input() genre: string = '';

  

 

  openMovieContainer(){
    this.openMovie.emit({
      title: this.title,
      description: this.description,
      genre: this.genre,
    });
  }
}
