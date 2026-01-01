import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonList, IonItem, IonThumbnail, IonLabel, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonButton, IonIcon, IonButtons, IonBackButton, IonListHeader } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { addIcons } from 'ionicons';//allows to add only the icons I need
import { heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonImg, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon, IonButtons, IonBackButton, IonListHeader]
})
export class RecipeDetailsPage {

  recipeId!: string;
  apiKey: string = "?apiKey=70759a4f7911402abcc53d3c51d3b759";
  recipeDetail!: any;
  measureType: string = "";
  isFavourite: boolean = false;
  favourites: any[] = [];

  optionsRecipeDetails: HttpOptions = {
    url: "https://api.spoonacular.com/recipes/"
  }

  constructor(private ds: MyDataService, private mhs: MyHttpService) { 
    addIcons({ heart, heartOutline });
  }

  ionViewWillEnter() {
    this.getRecipeDetail();

  }

  async getRecipeDetail() {

    //get recipe id from storage
    this.recipeId = await this.ds.get('selectedRecipeId');

    //get measurement preference from storage - default is metric
    this.measureType = await this.ds.get('measureType');
    this.measureType = this.measureType ?? 'metric';

    //construct API url
    this.optionsRecipeDetails.url = this.optionsRecipeDetails.url.concat(this.recipeId) + "/information" + this.apiKey

    //API call to get recipe details
    let result = await this.mhs.get(this.optionsRecipeDetails);
    this.recipeDetail = result.data;

    //get favourites from storage returns items or empty array
    this.favourites = await this.ds.get('favourites') ?? [];

    //check to see it current recipe is already a favourite
    for (let favRecipe of this.favourites) {
      if (favRecipe.id === this.recipeDetail.id) {
        this.isFavourite = true;
        break;
      }
      
    }
  }

   async toggleFavourite(){

    if (this.isFavourite) {
    // If favourite already remove as favourite create a new array
    this.favourites = this.favourites.filter(
      favRecipe => favRecipe.id !== this.recipeDetail.id
    );
  } else {
    //add as favourite if not favourire already
    this.favourites.push(this.recipeDetail);
  }
    // persist as new favourite
    await this.ds.set('favourites', this.favourites);

    // toggle favourite state
    this.isFavourite = !this.isFavourite;
  
   }
  }
