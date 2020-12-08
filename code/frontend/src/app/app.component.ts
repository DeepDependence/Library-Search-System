import { Component } from '@angular/core';
import { Book } from './book';
import { BookService } from './book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  books: Book[] = [];
  keyword: string = "";
  searchMode = false;

  constructor(private bookService: BookService) {}

  ngOnInit() {
  }

  searchBook() {
    this.searchMode = true;
    let keyword = this.keyword.trim().replace(/ +/, ',');
    if (keyword == "") {
      this.books = [];
      this.searchMode = false;
      alert("Please input keyword to search");
      return;
    }
    this.bookService.getBooks(keyword).subscribe(books => this.books = books);
  }
}
