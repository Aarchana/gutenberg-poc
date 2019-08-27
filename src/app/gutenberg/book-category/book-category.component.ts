import { Component, OnInit } from '@angular/core';
import {BookCategory} from '../model/book-category'
@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.scss']
})
export class BookCategoryComponent implements OnInit {

  public categoryList: Array<string>;
  constructor() { }

  ngOnInit() {
    this.categoryList = Object.values(BookCategory);
  }

}
