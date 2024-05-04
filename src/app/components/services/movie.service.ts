import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/MovieData.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }


  getMovieList(){
    const url = 'http://127.0.0.1:8000/videos'
    
    return this.http.get<Movie[]>(url)
  }
}
