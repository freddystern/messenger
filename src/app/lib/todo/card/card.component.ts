import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToDo } from '../card-list/card-list.component';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() todo: ToDo;
  @Output() checkTodo= new EventEmitter<ToDo>();


  constructor() { }

  ngOnInit() {}

  checkToggle(){
    this.todo.checked = !this.todo.checked;
    this.checkTodo.emit(this.todo);
  }

  remove(){
    this.todo.deleted = true;
    this.checkTodo.emit(this.todo);
  }


}
