import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "defaultImage"
})

export class DefaultImagePipe implements PipeTransform {
  transform(value: string): string {
    return !!value ? value :  './../../../assets/images/no-image.png';
  }
}
