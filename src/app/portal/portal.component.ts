import { WeatherService } from './../Shared/weather.service';
import { CrudService } from './../Shared/crud.service';
import { Component, OnInit } from '@angular/core';
import { Team } from '../Model/team.model';
import { Vaccine } from '../Model/vaccine.model';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  myCity = 'City';
  myWeather = 'Weather';
  myTemp = 'Temp';

  allTeamsList: Team[] ;
  public vaxList: Vaccine [] = [
    new Vaccine ('Vax1', 'Angular', 'Detailssfklfjkelrjkrjgelkgjeljrgreljglegjlegjlejrglejgle'),
    new Vaccine ('Vax2', 'Java', 'Detailssfklfjkelrjkrjgelkgjeljrgreljglegjlegjlejrglejgle'),
    new Vaccine ('Vax2', 'DotNet', 'Detailssfklfjkelrjkrjgelkgjeljrgreljglegjlegjlejrglejgle'),
    new Vaccine ('Vax2', 'React', 'Detailssfklfjkelrjkrjgelkgjeljrgreljglegjlegjlejrglejgle'),
 ];

  constructor(private crudService: CrudService,
              private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.crudService.readAllTeams()
    .subscribe(team => {
      this.allTeamsList = team ;
    });
  //   this.dasboardDetails.newTeamAdded
  //   .subscribe(team => {
  //     this.allTeamsList.push(team) ;
  //  }) ;
  }

  getCity(city: HTMLInputElement): void {
    this.weatherService.getWeatherDetails(city.value).subscribe(
      data => {
        this.myCity = city.value;
        this.myWeather = data[0].WeatherText;
        this.myTemp = data[0].Temperature.Metric.Value;
        city.value = '';
      }
    );
  }

}
