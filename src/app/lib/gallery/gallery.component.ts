import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements AfterViewInit {

  @ViewChild('gallery') galleryRef: ElementRef;

  gallery: HTMLElement;
  expand: boolean = false;
  gap = 2;
  size;
  @Input() minSize = 40;
  maxSize;
  multiSize = 1.4;


  constructor() { 
  }

  ngAfterViewInit(): void {
    this.size = this.minSize;
    this.gallery = this.galleryRef.nativeElement;
    this.gallery.style.setProperty('--sz', this.size + 'px');
    this.gallery.style.setProperty('grid-gap', this.gap + 'px');
    setTimeout(() => {
      this.checkExpand();
    }, 100);
  }

  @Input()
  zoom() {
    this.size = this.size * this.multiSize;
    if(this.expand) this.size = this.minSize;
    this.checkExpand();
    this.gallery.style.setProperty('--sz', this.size + 'px');
    console.log(this.size);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkExpand()


  }

  checkExpand() {   
    const Wc = this.gallery.offsetWidth;
    console.log("width: ", Wc)
    const N = Math.floor((Wc + this.gap) / (this.size + this.gap));
    if (N <= 1) {
      this.expand = true;
    } else {
      this.expand = false;
    }
  }


}