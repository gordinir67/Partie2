import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OlympicService } from '../../services/olympic.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})

export class CountryComponent implements OnInit {

  public titlePage! : string;
  public descriptionPage : string =
    'Explore Country data: medals and athletes';
  public totalJOs! : number;
  public totalMedals! : number;
  public totalAthletes! : number;

  public years: string[] = [];
  public medalsOverTime: number[] = [];
  public athletesOverTime: number[] = [];
  public error: string | null = null;
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly olympicService: OlympicService
  ) {}

public ngOnInit(): void {
  const id = Number(this.route.snapshot.params['id']);

  // ID absent ou invalide → redirection immédiate
  if (!id) {
    this.router.navigate(['not-found']);
    return;
  }

  this.olympicService.getCountryById(id).subscribe({
    next: (country) => {
      if (!country) {
        this.router.navigate(['not-found']);
        return;
      }
      this.titlePage = country.country;
    },
  });
 
  combineLatest([
    this.olympicService.getYearsById(id),
    this.olympicService.getMedalsById(id),
    this.olympicService.getAthletesById(id),
    this.olympicService.getTotalParticipationsById(id),
    this.olympicService.getMedalsCountById(id),
    this.olympicService.getAthletesCountById(id),
  ]).subscribe({
    next: ([years, medals, athletes, totalJOs, totalMedals, totalAthletes]) => {
      this.years = years;
      this.medalsOverTime = medals;
      this.athletesOverTime = athletes;
      this.totalJOs = totalJOs;
      this.totalMedals = totalMedals;
      this.totalAthletes = totalAthletes;
    }
  });

}

 private handleError(error: HttpErrorResponse): void {
  this.error = error.message;
}

}
