import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
  name: 'timeFormatPipe'
})
export class TimeTransformerPipe implements PipeTransform {

  transform(timeElapsedInSeconds: number, args?: any): any {
     const seconds = timeElapsedInSeconds % 60;
        const hours = timeElapsedInSeconds / 3600;
        const minutes = (timeElapsedInSeconds % 3600) / 60;
        const vals = [hours, minutes, seconds];
        return vals.map(x => ('0'+Math.floor(x)).slice(-2)).join(':');
  }
}
