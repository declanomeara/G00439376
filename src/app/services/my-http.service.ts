import { Injectable } from '@angular/core';
import { Capacitor, CapacitorHttp, HttpOptions} from '@capacitor/core'

@Injectable({
  providedIn: 'root',
})
export class MyHttpService {

  constructor(){}

  public async get(options:HttpOptions){
    return await CapacitorHttp.get(options);
  }
  
}
