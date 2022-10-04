import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GalleryComponent } from '../lib/gallery/gallery.component';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit{

  @ViewChild(GalleryComponent) gallery: GalleryComponent;

  constructor() { 
  }

  ngAfterViewInit(): void {

  }

  zoom(): void {
    this.gallery.zoom();
  }

}
