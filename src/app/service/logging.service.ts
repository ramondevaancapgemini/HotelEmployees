import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {

  constructor() { }

  add(message: string) {
    console.log(message);
  }
}
