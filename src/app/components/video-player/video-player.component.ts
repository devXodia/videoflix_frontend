import { Component, ElementRef, Input, ViewChild, ViewEncapsulation, signal } from '@angular/core';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Player from "video.js/dist/types/player";
import { Movie } from '../interfaces/MovieData.interface';
import { ShareDataService } from '../services/share-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
  
})
export class VideoPlayerComponent {
  @ViewChild('videoPlayer', {static: true}) videoPlayer!: ElementRef;
  @Input() options: any;
  @Input() cardMovie: boolean = false;
  @Input() movieTitle: string = '';
  private player!: Player;
 
  constructor(private elementRef: ElementRef){}

  ngOnInit(): void {
    
    this.player = videojs(this.videoPlayer.nativeElement, this.options)
    this.player.play();
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
    
  }
}


