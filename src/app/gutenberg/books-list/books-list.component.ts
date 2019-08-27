import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { SupportedFormats, Books } from '../model/book-category';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book-sevice';
import { HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {
  public books: Books;
  public category: string; 
  public userSearchInput: FormControl;
  public destroy$ = new Subject<boolean>()
  constructor(private route: ActivatedRoute, private router:Router, private service: BookService, private snackBar: MatSnackBar) { }
  public params: HttpParams;
  public page: number;
  public isLoading: boolean;

  @ViewChild('input', {static: true}) input;


  ngOnInit() {
    this.params = new HttpParams().set('mime_type', 'image');
    this.page = 2; // since for 1st page, API does not take any page param. Initializing it to 2
    this.route.paramMap.pipe(
      switchMap(params => {
        this.isLoading = true;
        this.category = params.get('category');
        this.params = this.params.set('topic', this.category);
        return this.service.getBooks(this.params).pipe(takeUntil(this.destroy$));
      })
    ).subscribe(res => {
        this.books = res; 
        this.isLoading = false;
      }, 
      () => this.isLoading = false
    );
  }

  ngAfterViewInit() {
    this.userSearchInput = new FormControl();
    this.userSearchInput.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe((value) => {
        this.getBooksBySearchInput(value);
    });
}

  public getBooksBySearchInput(text) {
    this.isLoading = true;
    this.params = text ? this.params.set('search', text) : this.params.delete('search');
    this.params = this.params.delete('page');
    this.getBooks();
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
  }

  public navigateBack() {
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  public viewDetails(book) {
    let supportedFormatFound = false;
    let formatKeys = Object.keys(book.formats);
    let supportedFormats = Object.values(SupportedFormats)
    for(let supportedFormat of supportedFormats) {
      if(this.service.searchText(formatKeys, supportedFormat)) {
        let book_url = book.formats[supportedFormat];
        if(String(book_url).endsWith('.zip'))
        break;
        supportedFormatFound = true;
        window.open(book_url, '_blank');
        break;
      }
    } 
    if(!supportedFormatFound) {
      alert('Sorry, no viewable format available.')
    }
  }

  public loadMore() {
    if(this.books.next !== null) {
      this.isLoading = true;
      this.params = this.params.set('page', this.page+'');
      this.getBooks(true);
    } else {
      this.openSnackBar('No more search results available.');
    }
    
  }

  public scrollHandler(e) {
    if (e === 'bottom') {
      this.loadMore()
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  public clearSearch() {
    this.isLoading = true;
    this.userSearchInput.setValue('');
    this.params = this.params.delete('search');
    this.params = this.params.delete('page', this.page+'')
    this.getBooks();
  }

  public getBooks(isLoadMore: boolean = false) {
    this.service.getBooks(this.params)
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      this.books = isLoadMore ? this.appendBooks(res) :res; 
      this.isLoading = false; 
    },error => this.isLoading = false)
  }

  public appendBooks(res) {
    this.books.count = res.count;
    this.books.next = res.next;
    this.books.previous = res.previous;
    this.books.results.push(...res.results)
    this.page = this.page + 1; 
    return this.books;
  }
}
