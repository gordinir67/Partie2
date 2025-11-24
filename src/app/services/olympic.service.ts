import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { OlympicCountry } from '../models/olympic-country.model';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private readonly olympicUrl = './assets/mock/olympic.json';
  private olympics$?: Observable<OlympicCountry[]>;

  constructor(private http: HttpClient) {}

  public getOlympics(): Observable<OlympicCountry[]> {
    if (!this.olympics$) {
      this.olympics$ = this.http
        .get<OlympicCountry[]>(this.olympicUrl)
        .pipe(shareReplay(1));
    }
    return this.olympics$;
  }

  public getCountryByName(
    countryName: string
  ): Observable<OlympicCountry | undefined> {
    return this.getOlympics().pipe(
      map((countries: OlympicCountry[]) =>
        countries.find(
          (country: OlympicCountry) =>
            country.country.toLowerCase() === countryName.toLowerCase()
        )
      )
    );
  }

  public getTotalCountries(): Observable<number> {
    return this.getOlympics().pipe(
      map((countries: OlympicCountry[]) => countries.length)
    );
  }

  public getTotalJOs(): Observable<number> {
    return this.getOlympics().pipe(
      map((countries: OlympicCountry[]) => {
        const years = new Set<number>();
        countries.forEach((country: OlympicCountry) =>
          country.participations.forEach((participation) =>
            years.add(participation.year)
          )
        );
        return years.size;
      })
    );
  }

  public getTotalMedals(): Observable<number> {
    return this.getOlympics().pipe(
      map((countries: OlympicCountry[]) =>
        countries.reduce((totalMedals: number, country: OlympicCountry) => {
          const countryMedals = country.participations.reduce(
            (sum: number, participation) => sum + participation.medalsCount,
            0
          );
          return totalMedals + countryMedals;
        }, 0)
      )
    );
  }

  public getTotalAthletes(): Observable<number> {
    return this.getOlympics().pipe(
      map((countries: OlympicCountry[]) =>
        countries.reduce((totalAthletes: number, country: OlympicCountry) => {
          const countryAthletes = country.participations.reduce(
            (sum: number, participation) => sum + participation.athleteCount,
            0
          );
          return totalAthletes + countryAthletes;
        }, 0)
      )
    );
  }

  public getMedalsByCountry(): Observable<{ labels: string[]; data: number[] }> {
    return this.getOlympics().pipe(
      map((countries: OlympicCountry[]) => {
        const labels = countries.map((country) => country.country);
        const data = countries.map((country) =>
          country.participations.reduce(
            (sum: number, participation) => sum + participation.medalsCount,
            0
          )
        );
        return { labels, data };
      })
    );
  }
}
