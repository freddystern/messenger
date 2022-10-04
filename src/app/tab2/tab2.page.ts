import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Observable } from 'rxjs';
import { FileSystemService } from '../lib/file/file-system.service';
import { GalleryComponent } from '../lib/gallery/gallery.component';
import { LocalVideo } from '../lib/media/video/video-capture.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit{

  @ViewChild('gallery') gallery: GalleryComponent;

  localVideos: Observable<LocalVideo[]>;

  constructor(private fileSystem: FileSystemService) { 
    this.localVideos = this.fileSystem.localVideos$;
  }

  ngAfterViewInit(): void {

  }

  getNativePath(path: string) {
    return Capacitor.convertFileSrc(path);
  }

  zoom(): void {
    this.gallery.zoom();
  }

}
