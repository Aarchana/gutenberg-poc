import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Books } from './model/book-category';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BookService {
    constructor(private http: HttpClient) { }
    public books: Books;

    public getBooks(params: HttpParams): Observable<Books> {
        return this.http.get<Books>('http://skunkworks.ignitesol.com:8000/books', {params: params});
    }

    public searchText(inputArr: string[], searchString: string): boolean {
        let regExp = new RegExp("^.*"+searchString.toLowerCase()+".*$")
        let output = inputArr.map(each => each.toLowerCase()).some(name => regExp.test(name));
        return output;
    }

   
}