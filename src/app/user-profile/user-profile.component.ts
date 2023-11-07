import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


type User = { 
   _id?: string, 
   Username?: string, 
   Password?: string, 
   Email?: string, 
   FavoriteMovies?: string[] 
}

@Component({
   selector: 'app-user-profile',
   templateUrl: './user-profile.component.html',
   styleUrls: ['./user-profile.component.scss']
})


export class UserProfileComponent implements OnInit {
   user: User = {};

   @Input() userData = { 
      Username: '', 
      Password: '', 
      Email: '' 
   };
   
   constructor(
      public fetchApiData: FetchApiDataService,
      public snackBar: MatSnackBar,
      public router: Router
   )  { 
console.log('UserProfileComponent loaded'); 
      }

   ngOnInit(): void {
      console.log(this.fetchApiData.getFavoriteMovies();)



      const user = this.getUser();
console.log('User data from localStorage:', user);
      if (!user._id) {
         this.router.navigate(['welcome']);
         return;
      }

      this.user = user;
      this.userData = {
         Username: user.Username || "",
         Email: user.Email || "",
         Password: ""
      }
   }

   getUser(): User {
      return JSON.parse(localStorage.getItem('username') || '{}');
   }

   updateUser(): void {
      this.fetchApiData.editUser(this.userData).subscribe((response) => {
console.log(response)
         localStorage.setItem('username', JSON.stringify(response))
         this.user = response;
         this.snackBar.open(
            'User Profile updated!', 
            'OK', 
            { duration: 2000 } 
         )
      } )
   }

   deleteUser(): void {
      if (confirm('Are you sure you to delete this User Profile?')) {
         this.router.navigate(['welcome']).then(() => {
            this.snackBar.open(
               "User Profile Deleted",
               "OK",
               { duration: 2000 }
            );
         });
         this.fetchApiData.deleteUser().subscribe((result) => {
console.log(result);
            localStorage.clear();
         } );
      }
   }

}