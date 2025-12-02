import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from '../../services/olympic.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  public titlePage : string = 'Olympic games statistics';
  public descriptionPage : string =
    'Explore Olympic data: countries, medals, athletes';
  public totalCountries!: number;
  public totalJOs!: number;
  public totalMedals!: number;
  public totalAthletes!: number;

  public chartLabels: string[] = [];
  public chartData: number[] = [];
  public countryIds: number[] = [];

  public error: string | null = null;

  constructor(
    private readonly olympicService: OlympicService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    forkJoin({
    countries: this.olympicService.getOlympics(),
    totalCountries: this.olympicService.getTotalCountries(),
    totalJOs: this.olympicService.getTotalParticipations(),
    totalMedals: this.olympicService.getTotalMedals(),
    totalAthletes: this.olympicService.getTotalAthletes(),
    medalsByCountry: this.olympicService.getMedalsByCountry(),
  }).subscribe({
    next: ({
      countries,
      totalCountries,
      totalJOs,
      totalMedals,
      totalAthletes,
      medalsByCountry,
    }) => {
      this.countryIds = countries.map(c => c.id);
      this.totalCountries = totalCountries;
      this.totalJOs = totalJOs;
      this.totalMedals = totalMedals;
      this.totalAthletes = totalAthletes;
      this.chartLabels = medalsByCountry.labels;
      this.chartData = medalsByCountry.data;
    }
  });
  }
  
public onCountrySelected(countryId: number): void {
  this.router.navigate(['country', countryId]);
}

}
