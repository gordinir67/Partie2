import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from '../../services/olympic.service';
import { OlympicCountry } from '../../models/olympic-country.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public titlePage = 'Olympic games statistics';
  public totalCountries = 0;
  public totalJOs = 0;
  public totalMedals = 0;
  public totalAthletes = 0;

  public chartLabels: string[] = [];
  public chartData: number[] = [];

  public error: string | null = null;

  constructor(
    private readonly olympicService: OlympicService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.olympicService.getOlympics().subscribe({
      next: (countries: OlympicCountry[]) => {
        this.totalCountries = countries.length;

        const years = new Set<number>();
        let medals = 0;
        let athletes = 0;

        countries.forEach((country: OlympicCountry) => {
          country.participations.forEach((participation) => {
            years.add(participation.year);
            medals += participation.medalsCount;
            athletes += participation.athleteCount;
          });
        });

        this.totalJOs = years.size;
        this.totalMedals = medals;
        this.totalAthletes = athletes;

        this.chartLabels = countries.map((country) => country.country);
        this.chartData = countries.map((country) =>
          country.participations.reduce(
            (sum: number, participation) => sum + participation.medalsCount,
            0
          )
        );
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.message;
      },
    });
  }

  public onCountrySelected(countryName: string): void {
    this.router.navigate(['country', countryName]);
  }
}
