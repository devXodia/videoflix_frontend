import { Component, ViewChild, ElementRef } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../interfaces/MovieData.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('movieListContainer') movieListContainer!: ElementRef<HTMLDivElement>;
  scrollAmount: number = 800;
  movieList: Movie[] = [
    {
      movieName: 'Halloween',
      releaseDate: '2001-02-23',
      imgSrc: '../../../../assets/test_images/flowers-276014_1280.jpg' 
    },
    {
      movieName: 'Halloween',
      releaseDate: '2001-02-23',
      imgSrc: '../../../../assets/test_images/polynesia-3021072_640.jpg' 
    },
    {
      movieName: 'Halloween',
      releaseDate: '2001-02-23',
      imgSrc: '../../../../assets/test_images/tree-736885_1280.jpg' 
    },
    {
      movieName: 'Halloween',
      releaseDate: '2001-02-23',
      imgSrc: '../../../../assets/test_images/flowers-276014_1280.jpg' 
    },
    {
      movieName: 'Halloween',
      releaseDate: '2001-02-23',
      imgSrc: '../../../../assets/test_images/polynesia-3021072_640.jpg' 
    },
    {
      movieName: 'Halloween',
      releaseDate: '2001-02-23',
      imgSrc: '../../../../assets/test_images/tree-736885_1280.jpg' 
    },
    {
      movieName: 'Halloween',
      releaseDate: '2001-02-23',
      imgSrc: '../../../../assets/test_images/flowers-276014_1280.jpg' 
    },
  
    {
      movieName: 'Halloween',
      releaseDate: '2001-02-23',
      imgSrc: '../../../../assets/test_images/polynesia-3021072_640.jpg' 
    },
    {
      movieName: 'Halloween',
      releaseDate: '2001-02-23',
      imgSrc: '../../../../assets/test_images/tree-736885_1280.jpg' 
    },
    {
      movieName: 'Halloween',
      releaseDate: '2001-02-23',
      imgSrc: '../../../../assets/test_images/flowers-276014_1280.jpg' 
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


}
