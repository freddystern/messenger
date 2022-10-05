import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {

  checked = false;
  isAdding = false;

  constructor() { }

  ngOnInit() {}

  onCheckboxChange(e) {
    console.log('checked: ', e.target.checked);
    if (e.target.checked) {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }

  add(){
    console.log("adding: ", this.isAdding)
    this.isAdding = !this.isAdding
  }

}
