import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { EMPTY, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OlympicService } from '../../services/olympic.service';
import { OlympicCountry } from '../../models/olympic-country.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit, OnDestroy {
  @ViewChild('countryChart', { static: true })
  public countryChartRef!: ElementRef<HTMLCanvasElement>;

  public lineChart: Chart<'line', number[], string> | null = null;
  public titlePage = '';
  public totalEntries = 0;
  public totalMedals = 0;
  public totalAthletes = 0;
  public years: string[] = [];
  public medalsOverTime: number[] = [];
  public athletesOverTime: number[] = [];
  public error: string | null = null;

  private subscription?: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly olympicService: OlympicService
  ) {}

public ngOnInit(): void {
  this.subscription = this.route.paramMap
    .pipe(
      map((params: ParamMap) => {

        const idString = params.get('id');
        return idString ? Number(idString) : null;  
      }),
      switchMap((countryId: number | null) => {
        if (!countryId) {
          this.router.navigate(['not-found']);
          return EMPTY;
        }
        return this.olympicService.getCountryById(countryId);
      })
    )
    .subscribe({
      next: (country: OlympicCountry | undefined) => {
        if (!country) {
          this.router.navigate(['not-found']);
          return;
        }

        this.titlePage = country.country;
        this.setCountryData(country);

        setTimeout(() => {
          this.buildLineChart();
        });
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.message;
      },
    });
}

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.lineChart) {
      this.lineChart.destroy();
    }
  }

  private setCountryData(country: OlympicCountry): void {
    const participations = country.participations;

    this.totalEntries = participations.length;
    this.years = participations.map((participation) =>
      participation.year.toString()
    );
    this.medalsOverTime = participations.map(
      (participation) => participation.medalsCount
    );
    this.athletesOverTime = participations.map(
      (participation) => participation.athleteCount
    );

    this.totalMedals = this.medalsOverTime.reduce(
      (accumulator: number, value: number) => accumulator + value,
      0
    );
    this.totalAthletes = this.athletesOverTime.reduce(
      (accumulator: number, value: number) => accumulator + value,
      0
    );
  }

  private buildLineChart(): void {
    if (!this.countryChartRef) {
      return;
    }
    if (this.lineChart) {
      this.lineChart.destroy();
    }

    this.lineChart = new Chart(this.countryChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.years,
        datasets: [
          {
            label: 'Medals',
            data: this.medalsOverTime,
          },
          {
            label: 'Athletes',
            data: this.athletesOverTime,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
