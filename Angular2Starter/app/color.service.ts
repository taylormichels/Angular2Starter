import { Injectable } from '@angular/core';
import { exception } from './exception';
import { Exceptions } from './exception-mocks';
@Injectable()
export class ColorService {
    getColor(id: number) : any {
        if (id == 9600) return { 'color': 'green', 'font-weight':'bold' };
        else return { 'color': 'red' };
        
    }
}