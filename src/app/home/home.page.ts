import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonButtons, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';//allows to add only the icons I need
import { heart, settings } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonButtons, IonIcon, RouterLink, FormsModule, IonCard, IonCardHeader, IonCardTitle, CommonModule, IonSpinner],
})
export class HomePage {
  apiKey: string = "&apiKey=70759a4f7911402abcc53d3c51d3b759";
  recipeInfo: any = [];
  ingredientRequest: string = "";
  isLoading: boolean = false;

  optionsSearch: HttpOptions = {
    url: "https://api.spoonacular.com/recipes/complexSearch?query="
  };

  constructor(private ds: MyDataService, private mhs: MyHttpService, private router: Router) {
    addIcons({ heart, settings }/*get icons on creation of page*/);
  }

  async getRecipesByIngredients() {

    if (!this.ingredientRequest || this.ingredientRequest.trim() === "") {
      this.recipeInfo = [];
      return;
    }

    this.isLoading = true;//start spinner

    try {
      //reset after every api call + make ingredients url safe
      this.optionsSearch.url = 'https://api.spoonacular.com/recipes/complexSearch?query=' + encodeURIComponent(this.ingredientRequest) + this.apiKey;

      let result = await this.mhs.get(this.optionsSearch);

      //if any element of chaining is undefined or missing,  return an empty array
      this.recipeInfo = result?.data?.results ?? [];

    } catch (error) {
      console.error("search failed", error);
      this.recipeInfo = [];
    }
    finally {
      this.isLoading = false;//stop spinner
    }
  }

  viewRecipeDetails(id: number) {
    this.ds.set('selectedRecipeId', id);
    this.router.navigate(['recipe-details']);
  }
}


