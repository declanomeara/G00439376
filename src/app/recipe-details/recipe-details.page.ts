import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RecipeDetailsPage implements OnInit {

  recipeId!:string;
  apiKey:string = "?apiKey=70759a4f7911402abcc53d3c51d3b759";
  recipeDetail!: any;
  measureType:string ="";

  optionsRecipeDetails: HttpOptions={
    url: "https://api.spoonacular.com/recipes/"
  }

  constructor(private ds: MyDataService,private mhs: MyHttpService) { }

  ngOnInit() {
    this.getRecipeDetail();

  }

  async getRecipeDetail(){
    this.recipeId = await this.ds.get('selectedRecipeId');
    this.measureType = await this.ds.get('measureType');

    this.optionsRecipeDetails.url = this.optionsRecipeDetails.url.concat(this.recipeId) + "/information" + this.apiKey
    
    let result = await this.mhs.get(this.optionsRecipeDetails);

    this.recipeDetail = result.data;
    console.log(this.recipeDetail);
  
   
  }

}
