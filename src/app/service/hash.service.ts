import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  // TODO mit einem Hash ein String encoden, z.B. year=1964&dwz1=1964-g... = 532bef... und das als Parameter an URL anhängen, bei Aufruf encoden

  constructor() { }
}
