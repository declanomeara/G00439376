import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';//allows to add only the icons I need
import { heart, settings } from 'ionicons/icons';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonButtons, IonIcon, RouterLink],
})
export class HomePage {
  constructor() {//get icons on creation of page
     addIcons({ heart, settings });
  }
}
