import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookCategoryComponent } from './book-category/book-category.component';
import { BooksListComponent } from './books-list/books-list.component';

const routes: Routes = [
    {path: 'books', component: BookCategoryComponent},
    {path: 'books/:category', component: BooksListComponent},
    {path: '', redirectTo: '/books', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GutenbergRoutingModule { }