import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class MyDataService {

  // This service will use ionic storage refer to ionic storage

  constructor(private storage: Storage ){//boiler plate get/set
    this.init();
    }

    async init(){
      await this.storage.create();
    }

    async get(key:string){
      return await this.storage.get(key);

    }

    async set(key:string, value:any){
      await this.storage.set(key, value);
    }
  
}
