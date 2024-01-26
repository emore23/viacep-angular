import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "date",
})
export class DatePipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return "";
    const date = typeof value === "string" ? new Date(value) : value;
    return `${this.addZero(date.getDate())}/${this.addZero(
      date.getMonth() + 1
    )}/${date.getFullYear()} ${this.addZero(date.getHours())}:${this.addZero(
      date.getMinutes()
    )}`;
  }

  private addZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
