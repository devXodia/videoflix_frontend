import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Player from "video.js/dist/types/player";

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
  constructor(private elementRef: ElementRef,){}

  private player!: Player;



  ngOnInit(): void {
    
    this.player = videojs(this.videoPlayer.nativeElement, this.options)
  }


  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}


