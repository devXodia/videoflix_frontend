import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {


  constructor(private http: HttpClient) {

   }


   stream420p(movieName: string){
    const url = `http://127.0.0.1:8000/videos/${movieName}/480p/`;

    return this.http.get(url)
   }
}
