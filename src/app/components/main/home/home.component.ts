import { Component, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../interfaces/MovieData.interface';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from '../../video-player/video-player.component';
import { MovieService } from '../../services/movie.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';





@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieCardComponent,CommonModule, VideoPlayerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
 
})
export class HomeComponent {
  @ViewChild('movieListContainer') movieListContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('homeMovie') homeMovie!: ElementRef<HTMLVideoElement>;
  @ViewChild('containerMovie' ) containerMovie!: ElementRef<HTMLVideoElement>;
  @ViewChild('cardContainer') cardContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('bgCardContainer') bgCardContainer!: ElementRef<HTMLDivElement>;
  scrollAmount: number = 800;
  showMovieDetails: boolean = false;
  movieSrc: string = '';
  movieDescription: string = '';
  movieTitle: string = '';
  movieGenre: string = '';
  movieRelease: string = '';  
  moviePoster: string | undefined = '';
  moviePlaying: boolean = false;
 
  movieList!: Movie[];

  constructor(private renderer: Renderer2, private movie: MovieService){}
    
    
  ngAfterViewInit(){
    this.fetchMovieList()
  }

  fetchMovieList(){
    this.movie.getMovieList().subscribe({
      next: (resp: Movie[]) => {
      this.movieList = resp;
      },
      error: (err: HttpErrorResponse) => {
        console.error('error ', err)
      }
    })
  }

  playMovie(){
    this.moviePlaying = true;
    this.containerMovie.nativeElement.play();
    this.containerMovie.nativeElement.controls = true;
    this.containerMovie.nativeElement.muted = false;
    
  }

  stopMovie(){
    this.moviePlaying = false;
    this.containerMovie.nativeElement.pause();
    this.containerMovie.nativeElement.currentTime = 0;
    this.containerMovie.nativeElement.controls = false;
    this.containerMovie.nativeElement.muted = true;
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

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedWithinBgCardContainer = this.bgCardContainer.nativeElement.contains(event.target as Node);
    const clickedWithinCardContainer = this.cardContainer.nativeElement.contains(event.target as Node);
  
    if (clickedWithinBgCardContainer && !clickedWithinCardContainer) {
      this.switchShowMovieDetails();
    }
  }


  switchShowMovieDetails(){
    this.showMovieDetails = !this.showMovieDetails;
    if(this.moviePlaying){
      this.stopMovie();
    }
  }

  handleMovieDetails($event: Movie){
    this.movieGenre = $event.genre;
    this.movieDescription = $event.description;
    this.movieTitle = $event.title;
    this.switchShowMovieDetails();
   
  }

}
