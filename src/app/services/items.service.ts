import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }


  public addItem(item: Item) {
    return this.http.post(`https://inventory-inventor-default-rtdb.europe-west1.firebasedatabase.app/items.json`, item);
  }

  public loadItems() {
      return this.http
    .get<{[key:string]:Item}>(`https://inventory-inventor-default-rtdb.europe-west1.firebasedatabase.app/items.json`)
    .pipe (
      map((data):Item[] => {
        let emp: Item[] = [];
        for (let e in data){
          emp.push({...data[e], id:e})
        }
        return emp;
      })
    )
  }

}
