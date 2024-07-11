import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { FavoriteMovieComponent } from './favorite-movie/favorite-movie.component';


const routes: Routes = [
  { path: '', component: FilterComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'favorites', component: FavoriteMovieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
