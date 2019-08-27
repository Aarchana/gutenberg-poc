import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './books-list/books-list.component';
import { BookCategoryComponent } from './book-category/book-category.component';
import { GutenbergRoutingModule } from './gutenberg-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatInputModule, MatIconModule } from '@angular/material';
import { AppMaterialModule } from '../app-material/app-material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ScrollableDirective } from '../scrollable.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BooksListComponent, BookCategoryComponent,ScrollableDirective],
  imports: [
    CommonModule,
    SharedModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    FormsModule,
    AppMaterialModule,
    GutenbergRoutingModule
  ],
  exports:[GutenbergRoutingModule, BooksListComponent, BookCategoryComponent, ScrollableDirective]
})
export class GutenbergModule { }
