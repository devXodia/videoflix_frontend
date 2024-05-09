import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/MovieData.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }


  getMovieList(){
    const url = 'https://alen-alduk.developerakademie.org/videos'

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
    };
    
    return this.http.get<Movie[]>(url, httpOptions)
  }
}
