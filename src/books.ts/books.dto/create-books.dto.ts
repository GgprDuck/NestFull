export class CreateBookDto {
    name: string;
    style: string;
    rate: number;
    author: string;
    comments?: Array<string>;
  }
  