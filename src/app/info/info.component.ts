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
      
      var fahrenheit = parseFloat(res.currently.temperature);
      this.temperatura = (fahrenheit-32) / 1.8;
      
      var date = new Date(res.currently.time * 1000);
      this.hora = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    }
    else{
      this.setInfo();
      console.log("caso de error y guarda en redis");
    }
  });
  }

}
