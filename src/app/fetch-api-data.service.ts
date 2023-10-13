import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';

@Injectable({
   providedIn: 'root'
})
export class UserRegistrationService {
   // Inject the HttpClient module to the constructor params
   // This will provide HttpClient to the entire class, making it available via this.http
   constructor(private http: HttpClient) { }
   
   private handleError(error: HttpErrorResponse): any {
      if (error.error instanceof ErrorEvent) {
         console.error('Some error occurred:', error.error.message);
      } else {
         console.error(
            `Error Status code ${error.status}, ` +
            `Error body is: ${error.error}`
         );
      }
      return throwError("Something bad happened; please try again later.");
   }

   // Non-typed response extraction
   private extractResponseData(res: Response): any {
      const body = res;
      return body || { };
   }


   // API: POST - User registration
   public userRegistration(userDetails: any): Observable<any> {
      console.log(userDetails);
      return this.http.post(
         apiUrl + 'users', 
         userDetails
      ).pipe(
         catchError(this.handleError)
      );
   }

   // API: POST - User login
   public userLogin(userDetails: any): Observable<any> {
      console.log(userDetails);
      return this.http.post(
         apiUrl + 'login', 
         userDetails
      ).pipe(
         catchError(this.handleError)
      );
   }

   // API: GET - all movies
   getAllMovies(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(
         apiUrl + 'movies', 
         { headers: new HttpHeaders({ Authorization: 'Bearer ' + token }) } 
      ).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // API: GET - one movie
   getOneMovie(title: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(
         apiUrl + 'movies/' + title, 
         { headers: new HttpHeaders({ Authorization: 'Bearer ' + token }) }
      ).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // API: GET - one director
   getOneDirector(directorName: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(
         apiUrl + 'movies/director/' + directorName, 
         { headers: new HttpHeaders({ Authorization: 'Bearer ' + token }) } 
      ).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // API: GET - one genre
   getOneGenre(genreName: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(
         apiUrl + 'movies/genre/' + genreName, 
         { headers: new HttpHeaders({ Authorization: 'Bearer ' + token }) } 
      ).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // API: GET - one user
   getOneUser(): Observable<any> {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      return this.http.get(
         apiUrl + 'users/' + username, 
         { headers: new HttpHeaders({ Authorization: 'Bearer ' + token }) } 
      ).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // API: GET - favorite movies for a user
   getFavoriteMovies(): Observable<any> {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      return this.http.get(
         apiUrl + 'users/' + username, 
         { headers: new HttpHeaders({ Authorization: 'Bearer ' + token }) } 
      ).pipe(
         map(this.extractResponseData),
         map((data) => data.FavoriteMovies),
         catchError(this.handleError)
      );
   }

   // API: POST - favorite movie to User profile
   addFavoriteMovie(movieId: string): Observable<any> {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      return this.http.post(
         apiUrl + 'users/' + username + '/movies/' + movieId, 
         { headers: new HttpHeaders({ Authorization: 'Bearer ' + token }) } 
      ).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // API: PUT - Edit User info
   editUser(updatedUser: any): Observable<any> {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      return this.http.put(
         apiUrl + 'users/' + username, updatedUser, 
         { headers: new HttpHeaders({ Authorization: 'Bearer ' + token }) } 
      ).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // API: DELETE - User
   deleteUser(): Observable<any> {
      const userid = localStorage.getItem('userid');
      const token = localStorage.getItem('token');
      return this.http.delete(
         apiUrl + 'users/' + userid, 
         { headers: new HttpHeaders({ Authorization: 'Bearer ' + token }) } 
      ).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // API: DELETE - movie from User's favorites
   deleteFavoriteMovie(movieId: string): Observable<any> {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      return this.http.delete(
         apiUrl + 'users/' + username + '/movies/' + movieId, 
         { headers: new HttpHeaders({ Authorization: 'Bearer ' + token }) } 
      ).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }
 
}

