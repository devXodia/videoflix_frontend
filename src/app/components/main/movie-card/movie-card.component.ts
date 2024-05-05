import { Component, Input } from '@angular/core';
import { ShareDataService } from '../../services/share-data.service';

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
  playingVideo: boolean = false;
  @Input() title = '';
  @Input() description = '';
  @Input() imgSrc = '';
  @Input() genre: string = '';


  constructor(private dataService: ShareDataService){}
  
  playVideo(){
    this.dataService.sendMovieCardData({
      title: this.title,
      description: this.description,
      genre: this.genre,
      imgSrc: '',
    })
  }
 

  

}
