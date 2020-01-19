import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  providers: [ WeatherService ]
})
export class InfoComponent implements OnInit {

  @Input() ciudad;
  temperatura = 0;
  hora = '00:00';
  res: any;
  offset: number;
  time: number;
  utc: string;

  constructor(public weatherService: WeatherService) { }

  ngOnInit() {
    this.setInfo();
  }

  setInfo() {

    // Se emite y se escucha por ciudad, generando el siguiente socket emisor y receptor

    this.weatherService.emit('getTime', {utc: this.ciudad});
    console.log('pasogetTime');

    this.weatherService.listen('getTime').subscribe( res => {

      this.res = res;
      if (this.ciudad === this.res.ciudad) {

        const fahrenheit = parseFloat(this.res.data.currently.temperature);
        this.temperatura = (fahrenheit - 32) / 1.8;

        console.log('data:', this.res.data);

        const date = new Date(this.res.data.currently.time * 1000);
        this.hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

        this.offset = this.res.data.offset;
        this.time = this.res.data.currently.time * 1000;
        this.setUtc();

      }

    });

  }
  setUtc() {
    this.utc = '+' + this.offset.toString();
  }
}

