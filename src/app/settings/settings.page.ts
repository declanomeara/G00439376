import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRadioGroup, IonRadio } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRadioGroup, IonRadio]
})
export class SettingsPage implements OnInit {

  measureType:string = "metric" ;


  constructor(private ds: MyDataService) { }

  ngOnInit() {
    this.getSelected();
  }

  async setSelected(){
    await this.ds.set("measureType", this.measureType);
  }

  async getSelected() {
   const storedValue = await this.ds.get('measureType');

   if (storedValue !=null){
    this.measureType = storedValue;
   }
   else{
    this.measureType = "metric";
   }

  }

}
