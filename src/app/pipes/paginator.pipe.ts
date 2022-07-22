import { Pipe, PipeTransform } from '@angular/core';
import { GlobalSettings } from '../shared/settings';

@Pipe({
  name: 'paginator'
})
export class PaginatorPipe implements PipeTransform {
  itemPerPage: number = GlobalSettings.CANTIDAD_FILAS;
  transform(items: any[], page: number = 0): any[] {
    return items.slice(page, page + this.itemPerPage);
  }

}
