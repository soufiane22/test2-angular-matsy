import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  query: string = '';
  movies: any[] = [];
  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(){
    this.movieService.searchMovies(this.query).subscribe(
      {
        next : (res:any) => {
          console.log("res ",res);
          this.movies = res;
        },
        error : (err:any) => {
          console.log("err ",err);


        }
      }
    );
  }

}
