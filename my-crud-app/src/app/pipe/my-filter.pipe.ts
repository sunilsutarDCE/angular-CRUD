import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter',
  pure : true
})
export class MyFilterPipe implements PipeTransform {

  transform(items: any[], filter?: any): any {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => {
      if(item.description.toLowerCase().indexOf(filter) !== -1 
         || item.status.toLowerCase().indexOf(filter) !== -1 
         || item.priority.toLowerCase().indexOf(filter) !== -1)
           return true;

           return false;
    });
  }

}
