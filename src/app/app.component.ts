import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app-weather';
  // TODO obtener desde DB
  ciudades: string[] = ['santiago', 'zurich', 'auckland', 'sidney', 'londres', 'georgia'];

}
