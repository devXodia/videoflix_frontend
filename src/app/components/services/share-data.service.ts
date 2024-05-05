import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Movie } from '../interfaces/MovieData.interface';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private movieCardData = new Subject<Movie>();
  constructor() { }

  movieCardData$ = this.movieCardData.asObservable()


  sendMovieCardData(data: Movie) {
    this.movieCardData.next(data);
  }


}
