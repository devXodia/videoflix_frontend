import { Component, ViewChild, ElementRef, HostListener, Renderer2  } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../interfaces/MovieData.interface';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from '../../video-player/video-player.component';
import { MovieService } from '../../services/movie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ShareDataService } from '../../services/share-data.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';





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

  src480p: string = '';
  src720p: string = '';
  Imgsrc: string = '';
  movieList!: Movie[];
  subscription!: Subscription;
  mode480p: boolean = false;
  mode720p: boolean = true;
  authenticated: boolean = this.auth.loggedIn;

  constructor(private renderer: Renderer2, private movie: MovieService, private dataService: ShareDataService, private auth: AuthService, private router: Router){}


  ngOnInit(){
    this.recieveMovieData();
  }
  
  ngAfterViewInit(){
    this.fetchMovieList()
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedWithinBgCardContainer = this.bgCardContainer.nativeElement.contains(event.target as Node);
    const clickedWithinCardContainer = this.cardContainer.nativeElement.contains(event.target as Node);
  
    if (clickedWithinBgCardContainer && !clickedWithinCardContainer) {
      this.switchShowMovieDetails();
    }
  }

  refreshToken(){
    this.auth.refreshJWT().subscribe({
      next: (resp) => {
        if(resp.access && resp.refresh){
          localStorage.setItem('access_token', resp.access);
          localStorage.setItem('refresh_token', resp.refresh);
        }
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  logoutUser(){
    this.auth.logoutUser().subscribe({
      next: (resp) => {
        if(localStorage){
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
        this.auth.loggedIn = false;
        this.router.navigateByUrl('');
      },
      error: (err) => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          this.router.navigateByUrl('');
      }
    })
  }


  recieveMovieData(){
    this.subscription = this.dataService.movieCardData$.subscribe({
      next: (data:Movie) => {
        this.handleMovieDetails(data)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
    
 
  fetchMovieList(){
    this.movie.getMovieList().subscribe({
      next: (resp: Movie[]) => {
      this.movieList = resp;
      this.movieList.forEach((movie: Movie) => {
        movie.imgSrc = `https://alen-alduk.developerakademie.org/media/videos/${movie.title.toLowerCase()}/poster.jpg`
      });
      },
      error: (err: HttpErrorResponse) => {
        console.error('error ', err)
      }
    })
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

  handleMovieDetails(data: Movie){
    this.movieGenre = data.genre;
    this.movieDescription = data.description;
    this.movieTitle = data.title;
    this.movieTitle = this.movieTitle
    this.src480p = `https://alen-alduk.developerakademie.org/media/videos/${this.movieTitle.toLowerCase()}/480p/${this.movieTitle.toLowerCase()}_480p.m3u8`
    this.src720p = `https://alen-alduk.developerakademie.org/media/videos/${this.movieTitle.toLowerCase()}/720p/${this.movieTitle.toLowerCase()}_720p.m3u8`
    this.switchShowMovieDetails();
  }

  switchTo480p(){
    this.mode720p = false;
    this.mode480p = true;
    
  }

  

  switchTo720p(){
    this.mode480p = false;
    this.mode720p = true;
  }

  

}
