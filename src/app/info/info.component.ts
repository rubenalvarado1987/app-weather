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

  constructor(private weatherService:WeatherService) { }

  ngOnInit() {
    this.setInfo();
  }

  setInfo(){
    this.weatherService.getInfo(this.ciudad).subscribe((res)=>{
      if(res.currently != undefined){
      this.temperatura = res.currently.temperature;
      this.hora = res.currently.time;
    }
    else{
      this.setInfo();
      console.log("caso de error y guarda en redis");
    }
  });
  }

}
