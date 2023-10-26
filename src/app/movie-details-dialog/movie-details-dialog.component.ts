import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
   selector: 'app-movie-details-dialog',
   templateUrl: './movie-details-dialog.component.html',
   styleUrls: ['./movie-details-dialog.component.scss']
})


export class MovieDetailsDialogComponent implements OnInit {

   constructor(
      @Inject(MAT_DIALOG_DATA)
      public data: {
         title: string,
         content: string,
      }
   ) { }

   ngOnInit(): void { }

}