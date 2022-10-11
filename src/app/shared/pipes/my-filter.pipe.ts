import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
    pure: false
})

export class MyFilterPipe implements PipeTransform {
    transform(items: any[], filter: any): any {

        if (!items || !filter.search) {
            return items;
        }
        
        

        if (filter.src === 'schemeState') {

            console.log(filter);
            console.log(items);
           return items.filter(item => item.state_name.toUpperCase().indexOf(filter.search.toUpperCase()) !== -1);
        }

    }
}
