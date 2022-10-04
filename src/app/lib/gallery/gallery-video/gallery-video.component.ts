import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'gallery-video',
  templateUrl: './gallery-video.component.html',
  styleUrls: ['./gallery-video.component.scss'],
})
export class GalleryVideoComponent implements OnInit, AfterViewInit {

  @Input() controls: boolean;
  @Input() src: string;
  @ViewChild('video') videoRef: ElementRef;
  video: HTMLVideoElement;
  pause = true;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    console.log(this.src)
    if (this.videoRef) {
      this.initVideo();
    }
  }


  initVideo() {
    this.video = this.videoRef.nativeElement;
    this.video.src = this.src;
    this.video.load();
    this.video.addEventListener('pause', ev => {
      this.pause = true;
    })
    this.video.addEventListener('play', ev => {
      this.pause = false;
    })
  }

  play() {
    if (this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }

}
