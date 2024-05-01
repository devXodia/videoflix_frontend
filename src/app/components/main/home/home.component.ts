import { Component, ViewChild, ElementRef } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../interfaces/MovieData.interface';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieCardComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
 
})
export class HomeComponent {
  @ViewChild('movieListContainer') movieListContainer!: ElementRef<HTMLDivElement>;
  scrollAmount: number = 800;
  showMovieDetails: boolean = false;
  movieSrc: string = '';
  movieDescription: string = '';
  movieTitle: string = '';
  movieGenre: string = '';
  movieRelease: string = '';  
 
  movieList: Movie[] = [
    {
      title: 'Halloween',
      description: 'LA LA LA',
      genre: 'Action',
      releaseDate: '2001-02-23',
      src: '../../../../assets/test_images/flowers-276014_1280.jpg' 
    },
    {
      title: 'Star Wars',
      description: 'LA LA LA',
      genre: 'Action, Sci Fi',
      releaseDate: '2008-01-23',
      src: '../../../../assets/test_images/polynesia-3021072_1280.jpg' 
    },
    {
      title: 'Hancock',
      description: 'LA LA LA',
      genre: 'Action, Fantasy',
      releaseDate: '2004-04-11',
      src: '../../../../assets/test_images/tree-736885_1280.jpg' 
    },
    {
      title: 'Mario Kart',
      description: 'LA LA LA',
      genre: 'Action',
      releaseDate: '2001-02-23',
      src: '../../../../assets/test_images/flowers-276014_1280.jpg' 
    },
    {
      title: 'Harry Potter',
      description: 'LA LA LA',
      genre: 'Action, Sci Fi',
      releaseDate: '2008-01-23',
      src: '../../../../assets/test_images/polynesia-3021072_1280.jpg' 
    },
    {
      title: 'Fast and Furious: Tokyo Drift',
      description: 'LA LA LA',
      genre: 'Action, Fantasy',
      releaseDate: '2004-04-11',
      src: '../../../../assets/test_images/tree-736885_1280.jpg' 
    },
    
    
  ]

  scrollLeft(){
    if (this.movieListContainer) {
      this.movieListContainer.nativeElement.scrollTo({
        left: this.movieListContainer.nativeElement.scrollLeft - this.scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  scrollRight(){
    if (this.movieListContainer) {
      this.movieListContainer.nativeElement.scrollTo({
        left: this.movieListContainer.nativeElement.scrollLeft + this.scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  switchShowMovieDetails(){
    this.showMovieDetails = !this.showMovieDetails;
   
  }

  handleMovieDetails($event: Movie){
    this.movieGenre = $event.genre;
    this.movieDescription = $event.description;
    this.movieTitle = $event.title;
    this.movieSrc = $event.src;
    this.movieRelease = $event.releaseDate;
    this.switchShowMovieDetails();
    
  }

}
