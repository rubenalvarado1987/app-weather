import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  public socketStatus = false;

  constructor(private http: HttpClient, private socket: Socket) {
    this.checkStatus();
  }

  checkStatus(){
    this.socket.on('connect', () => {
      console.log('Usuario conectado');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Usuario desconectado');
      this.socketStatus = false;
    });
  }

  // evento, payload, callback Metodo generico reutilizable
  emit(evento: string, payload?: any, callback?: Function){
    this.socket.emit(evento, payload, callback);

  }

  listen(evento:string){
    return this.socket.fromEvent(evento);
  }

}
