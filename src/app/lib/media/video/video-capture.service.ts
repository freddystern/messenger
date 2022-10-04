import { Injectable } from '@angular/core';
import { MediaFile, VideoCapturePlus } from '@ionic-native/video-capture-plus/ngx';
import { Platform } from '@ionic/angular';
import { FileSystemService } from '../../file/file-system.service';
import { FileService } from '../../file/file.service';

@Injectable({
  providedIn: 'root'
})
export class VideoCaptureService {

  constructor(private videoCapture: VideoCapturePlus, private filseService: FileService, private fileSystem: FileSystemService, private platform: Platform) { }

  public async capture(): Promise<LocalVideo> {
    const options = {
      duration: 30,
      highquality: true,
      limit: 1
    }

    const video = (await this.videoCapture.captureVideo(options))[0];
    let fullPath = this.filseService.convertToNativeUrl(video.fullPath);
    const name = fullPath.split('/').pop();

    return { name: name, fullPath: fullPath};

  }

}

export interface LocalVideo {
  name: string,
  fullPath: string
}
