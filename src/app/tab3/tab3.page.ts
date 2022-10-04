import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { FileSystemService } from '../lib/file/file-system.service';
import { LocalVideo, VideoCaptureService } from '../lib/media/video/video-capture.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements AfterViewInit {

  @ViewChild('video') videoRef: ElementRef;
  video: HTMLVideoElement;
  localVideo: LocalVideo;

  constructor(private videoCapture: VideoCaptureService, private fileSystem: FileSystemService) {}

  ngAfterViewInit(): void {
    this.video = this.videoRef.nativeElement;
    this.video.addEventListener('loadedmetadata', ev => {
      console.log('loadedmetadata');
    })
  }

  play(){
    this.video.play();
  }

  async captureVideo(){
    this.localVideo = await this.videoCapture.capture();
    console.log('localVideo: ', this.localVideo);
    this.video.src = await Capacitor.convertFileSrc(this.localVideo.fullPath);
    await this.video.load();
  }

  async saveVideo(){
    if(this.localVideo){
      const newVideo = await this.fileSystem.saveVideo(this.localVideo);
      console.log("copied Video: ", newVideo);
      this.video.src = Capacitor.convertFileSrc(newVideo.fullPath);
      this.video.load();
      this.localVideo = undefined;
    }
  }

}
