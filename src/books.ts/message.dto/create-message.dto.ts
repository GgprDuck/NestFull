export class createMessageDto{
    date:string;
    comment:string;
    author: string;
    
    constructor(date,comment,author) {
        this.date = date;
        this.comment = comment;
        this.author = author;
    }
}