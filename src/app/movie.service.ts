import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retryWhen, delay, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  private apiKey = 'e48dcddcd8msh73ab1856a59875dp10c97cjsn57cc45c81886';
  private baseUrl  = "https://jsonplaceholder.typicode.com/posts"
  // private baseUrl = 'https://moviesdatabase.p.rapidapi.com/titles/%7Bid%7D/main_actors';
  private host = "moviesdatabase.p.rapidapi.com"
  private cache = new Map<string, any>();
  private link2 = 'https://api.themoviedb.org/3';
  private key2 = "f3780a851b3342582f39345250222085"
  private jeton = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzc4MGE4NTFiMzM0MjU4MmYzOTM0NTI1MDIyMjA4NSIsIm5iZiI6MTcyMDY5NTQ0MC4wNzY4NDMsInN1YiI6IjY2OGZiNDZkNTc4NjIwNGUxYzJjMjQ1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KOTjW5fDxTdyW8ujz7pWOvpEeR9HzX3po2VGnUUPSMs"

  // searchMovies(query: string): Observable<any> {
  //   const url = `${this.baseUrl}?query=${query}`;
  //   return this.http.get(url);
  // }

  searchMovies(query: string): Observable<any> {
    const url = `${this.baseUrl}`;
    if (this.cache.has(url)) {
      return of(this.cache.get(url));
    }
    return this.http.get(url, this.getHeaders()).pipe(
      tap(response => this.cache.set(url, response)),
      retryWhen(errors => errors.pipe(
        delay(3000),
        take(3),
        catchError(err => throwError(err))
      )),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 429) {
      console.error('Too many requests. Please try again later.');
    } else {
      console.error(`Error: ${error.message}`);
    }
    return throwError('Something went wrong. Please try again later.');
  }

  getMovieDetails(id: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'x-rapidapi-host': this.host,
        'x-rapidapi-key': this.apiKey
      })
    };
  }
}
