import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonButton, IonCardTitle } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonButton, IonCardTitle]
})
export class FavouritesPage  {
  
  favourites: any[] =[];

  constructor(private ds: MyDataService, private router: Router) { }

  async ionViewWillEnter() {
    //get favourites from storage or return an empty array
    this.favourites = await this.ds.get('favourites') ?? [];
  }

  viewDetails(recipe:any){
    this.ds.set('selectedRecipeId', recipe.id);
    this.router.navigate(['/recipe-details']);
  }

}
