import { Component, OnInit, Input } from '@angular/core';
import { Book } from '@app/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  @Input() books: Book[] | [];

  constructor() { }

  ngOnInit(): void {
  }
}