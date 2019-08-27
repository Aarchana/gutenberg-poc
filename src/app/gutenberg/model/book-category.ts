export enum BookCategory {
    FICTION = 'FICTION',
    DRAMA = 'DRAMA',
    HUMOR = 'HUMOR',
    POLITICS = 'POLITICS',
    PHILOSOPHY = 'PHILOSOPHY',
    HISTORY = 'HISTORY',
    ADVENTURE = 'ADVENTURE'
}

export class Book {
    id: number;
    authors: Author[];
    bookshelves: string[];
    downloadCount: number;
    formats: any;
    languages: string[];
    subjects: string[];
    title: string;
}

export class Author {
    name: string;
    birth_year: number;
    death_year: number;
}

export class Books {
    count: number;
    next: string | null;
    previous: string | null;
    results: Book[];
}

export enum SupportedFormats {
    HTML_UTF= 'text/html; charset=utf-8',
    HTML_ISO = 'text/html; charset=iso-8859-1',
    HTML = 'text/html',
    PDF='application/pdf',
    TEXT_UTF = 'text/plain; charset=utf-8',
    TEXT_ISO = 'text/plain; charset=iso-8859-1',
    TEXT_US = 'text/plain; charset=us-ascii',
    TEXT='text/plain',
}