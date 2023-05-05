import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
  <div>
  <div *ngIf="loading" id="buffer" class="buffering">
  <img style="borderRadius:'50%'" src="../assets/animie.svg">
  </div>
  <div *ngIf="!loading" id="all">
    <div class="row fl">
      <div class="col-lg-1"></div>
      <div class="col-lg-4 col-sm-12 cen" data-aos="fade-right">

        <div class="left">
          <h3 style="font-weight:'800';color:'#4B77BE'" class="w">The Weather App</h3>
          <h1 class="t">{{temperature}}</h1>
          <h3 style="font-weight:'800';color:'#4B77BE'" class="p">{{place}}</h3>
        </div>
        <div class="in">

          <input class="form-control tx" id="xt" [(ngModel)]="placeName" placeholder="Enter City" />
          <button class="btn btn-primary sub" type="submit" (click)="updateWeather(placeName)">Get weather</button>
        </div>
      </div>
      <div class="col-lg-4 cen2">
       <div class="right">
        <img class="image" src="../assets/weather.png">
        </div>
      </div>
      <div class="col-lg-2"></div>

    </div>
    </div>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  placeName='';
  place = '--';
  temperature = '--';
  loading = false;
  constructor(private modalService: NgbModal,private http: HttpClient) {
  this.updateWeather('vizag');
  }
  
  async updateWeather(placename: string) {
    this.loading = true;
    if(placename==="vizag"||placename==="Vizag"){
      placename="visakhapatnam"
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${placename}&appid=91e0c75e4bcb8da4bc40c0b329e5d2a9&units=metric`;

    try {
      const data = await this.http.get<any>(url).toPromise();

      this.place = data.name;
      this.temperature = `${data.main.temp}° Celsius`;


    } catch (error) {
      console.error(error);

      this.place = 'No Data Found';
      this.temperature = '';


    }
    this.loading = false;
    this.placeName='';
  }


  public open(modal: any): void {
    this.modalService.open(modal);
  }

}