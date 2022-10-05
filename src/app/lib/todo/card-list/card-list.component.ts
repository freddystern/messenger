import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {

  checked = false;
  isOpen = false;
  todos: ToDo[] = [];
  todosDone: ToDo[] = [];
  id: number = 0;
  newToDo: string = '';

  constructor() { }

  ngOnInit() { }

  onCheckboxChange(e) {
    console.log('checked: ', e.target.checked);
    if (e.target.checked) {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }

  open() {
    console.log("adding: ", this.isOpen)
    this.isOpen = !this.isOpen
  }

  add() {
    if(this.newToDo != ''){
      this.todos.push({
        id: this.id++,
        content: this.newToDo,
        checked: false,
        deleted: false
      })
      this.newToDo = ''
    }
  }

  checkTodo(todo: ToDo) {
    console.log("check todo: ", todo);
    if (todo.checked) {
      this.todos = this.todos.filter(item => {return item.id != todo.id});
      this.todosDone.push(todo);
    }
    if (!todo.checked) {
      this.todosDone = this.todosDone.filter(item => {return item.id != todo.id});
      this.todos.push(todo);
    }
    if (todo.deleted)
      this.removeTodo(todo);
  }

  removeTodo(todo: ToDo) {

    if (!todo.checked) {
      this.todos = this.todos.filter(item => {return item.id != todo.id});
    }
    if (todo.checked) {
      this.todosDone = this.todosDone.filter(item => {return item.id != todo.id});
    }
    console.log(this.todos);
    console.log(this.todosDone);
  }

}

export interface ToDo {
  id: number;
  content: string;
  checked: boolean;
  deleted: boolean;
}
