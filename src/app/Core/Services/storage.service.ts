
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class StorageService{

  /*CREATE / UPDATE*/

  saveItem<T extends{id: string | number}>(key: string,item:T): void{
    const items = this.getItems<T>(key);
    const index = items.findIndex(i=> i.id === item.id);

    if(index > -1){
      items[index]= item; //editar
    }else{
      items.push(item); // crear nuevo
    }

    localStorage.setItem(key,JSON.stringify(items));
    }

    /* READ*/
    getItems<T>(key: string):T[]{
      return JSON.parse(localStorage.getItem(key)|| '[]');
    }

    /*DELETE */
    deleteItem(key: string, id:string | number):void{
      const items = this.getItems<any>(key);
      const updated = items.filter(i => i.id !==id);
      localStorage.setItem(key,JSON.stringify(updated));
    }

  }
