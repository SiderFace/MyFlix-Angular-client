import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'app-movie-card',
   templateUrl: './movie-card.component.html',
   styleUrls: ['./movie-card.component.scss']
})


export class MovieCardComponent {
   movies: any[] = [];

   constructor(
      public fetchApiData: FetchApiDataService,
      public dialog: MatDialog,
      public snackBar: MatSnackBar,
      public router: Router
   ) { }

   ngOnInit(): void {     
      const token = localStorage.getItem('token');
      
      if (!token) {
         this.router.navigate(['welcome']);
         return;
      }
      this.getMovies();
   }


   getMovies(): void {
   this.fetchApiData.getAllMovies().subscribe((resp: any) => {
         this.movies = resp;
console.log(this.movies);
         return this.movies;
      } );
   }

   openGenreDialog(genre: any): void {
      this.dialog.open(MovieDetailsDialogComponent, {
         data: {
            title: genre.Name,
            content: genre.Description,
         }
      } )
   }

   openDirectorDialog(director: any): void {
      this.dialog.open(MovieDetailsDialogComponent, {
         data: {
            title: director.Name,
            content: director.Bio,
         }
      } )
   }

   openDetailsDialog(details: string): void {
      this.dialog.open(MovieDetailsDialogComponent, {
         data: {
            title: "Description",
            content: details,
         }
      } )
   }  

   addFavorite(id: string): void {
      this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
         this.snackBar.open(
            'The movie has been added to your Favorites', 
            'OK', 
            { duration: 2000 }
         )
      } );
   }   
  
   currentFavorite(id: string): boolean {
      return this.fetchApiData.currentFavoriteMovies(id)
   }
   
   removeFavorite(id: string): void {
      this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
         this.snackBar.open(
            'removed from favorites', 
            'OK', 
            { duration: 2000 }
         )
      } );
   }
  
}