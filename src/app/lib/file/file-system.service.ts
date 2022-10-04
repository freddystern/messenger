import { Injectable } from '@angular/core';
import { Directory, Filesystem, MkdirOptions, ReaddirOptions, ReaddirResult } from '@capacitor/filesystem';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalVideo } from '../media/video/video-capture.service';
import { FileService } from './file.service';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  TAG = 'FileSystemService';
  debug = true;
  VIDEO_DIR = 'Videos';
  localVideos: BehaviorSubject<LocalVideo[]> = new BehaviorSubject([]);
  localVideos$: Observable<LocalVideo[]> = this.localVideos.asObservable();

  constructor(private file: FileService) { 
    this.createVideoFolder();
    this.loadVideos();
  }

  async saveVideo(video: LocalVideo): Promise<LocalVideo>{
    const videoPathSplit = video.fullPath.split('/');
    const name = videoPathSplit.pop();
    const fromDirectory = videoPathSplit.join('/');
    const fileEntry = await this.file.copy({ from: name, fromDirectory: fromDirectory, to: name, toRelativeDirectory: this.VIDEO_DIR});
    const localVideo = await { name: fileEntry.name, fullPath: fileEntry.nativeURL };
    await this.localVideos.getValue().push(localVideo);
    return await { name: fileEntry.name, fullPath: fileEntry.nativeURL };

  }

  public async loadVideos(){
    console.log(this.TAG + ' getVideos');
    const options: ReaddirOptions = {path: this.VIDEO_DIR, directory: Directory.Documents};
    const dirResults: ReaddirResult = await Filesystem.readdir(options);
    let localVideos: LocalVideo[] = [];
    await dirResults.files.forEach(file => localVideos.push({name: file.name, fullPath: file.uri}));
    await this.localVideos.next(localVideos);
  }

  private async createVideoFolder(){
    if(this.debug) console.log(this.TAG + ' createVideoFolder');
    await Filesystem.mkdir({
      directory: Directory.Documents,
      path: this.VIDEO_DIR
    })
  }
  
}
