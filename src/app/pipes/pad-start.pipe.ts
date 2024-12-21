import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'padStart' })
export class PadStartPipe implements PipeTransform {
  transform(value: string | number, numberLength: number, fillChar: string): string {
    return String(value).padStart(numberLength, fillChar);
  }
}