import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonButton, IonCardTitle, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonButton, IonCardTitle, IonButtons, IonIcon]
})
export class FavouritesPage  {
  
  favourites: any[] =[];

  constructor(private ds: MyDataService, private router: Router) { 
    addIcons({trash});
  }

  async ionViewWillEnter() {
    //get favourites from storage or return an empty array
    this.favourites = await this.ds.get('favourites') ?? [];
  }

  viewDetails(recipe:any){
    this.ds.set('selectedRecipeId', recipe.id);
    this.router.navigate(['/recipe-details']);
  }

  async clearAllFavourites(){//clear all saved favourites
    await this.ds.set('favourites', []);
    this.favourites =[];

  }

}
