import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
  @ViewChild('homeVideo') homeVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('containerVideo' ) containerVideo!: ElementRef<HTMLVideoElement>;
  scrollAmount: number = 800;
  showMovieDetails: boolean = false;
  movieSrc: string = '';
  movieDescription: string = '';
  movieTitle: string = '';
  movieGenre: string = '';
  movieRelease: string = '';  
  moviePoster: string | undefined = '';
 
  movieList: Movie[] = [
    {
      title: 'Halloween',
      description: 'The dark hunted hut',
      genre: 'Horror',
      releaseDate: '2001-02-23',
      src: '../../../../assets/test_videos/hut.mp4',
      poster: '../../../../assets/test_images/poster_hut.png' 
    },
    {
      title: 'Star Wars',
      description: 'LA LA LA',
      genre: 'Action, Sci Fi',
      releaseDate: '2008-01-23',
      src: '../../../../assets/test_videos/earth.mp4',
      poster: '../../../../assets/test_images/earth.png'  
    },
    {
      title: 'Halloween',
      description: 'The dark hunted hut',
      genre: 'Horror',
      releaseDate: '2001-02-23',
      src: '../../../../assets/test_videos/hut.mp4',
      poster: '../../../../assets/test_images/poster_hut.png' 
    },
    {
      title: 'Star Wars',
      description: 'LA LA LA',
      genre: 'Action, Sci Fi',
      releaseDate: '2008-01-23',
      src: '../../../../assets/test_videos/earth.mp4',
      poster: '../../../../assets/test_images/earth.png'  
    },
    {
      title: 'Halloween',
      description: 'The dark hunted hut',
      genre: 'Horror',
      releaseDate: '2001-02-23',
      src: '../../../../assets/test_videos/hut.mp4',
      poster: '../../../../assets/test_images/poster_hut.png' 
    },
    {
      title: 'Star Wars',
      description: 'LA LA LA',
      genre: 'Action, Sci Fi',
      releaseDate: '2008-01-23',
      src: '../../../../assets/test_videos/earth.mp4',
      poster: '../../../../assets/test_images/earth.png'  
    },
    
    
  ]

  ngAfterViewInit(){
    this.homeVideo.nativeElement.autoplay = true;
   
    
  }
 

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
    this.moviePoster = $event.poster
    this.switchShowMovieDetails();
    this.containerVideo.nativeElement.autoplay = true;
  }

}
