import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OlympicCountry } from '../models/olympic-country.model';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private readonly olympicUrl = './assets/mock/olympic.json';
  private olympics$?: Observable<OlympicCountry[]>;

  constructor(private http: HttpClient) {}

  // retourne la liste complète des pays participants aux JO avec les détails de leur participations
  public getOlympics(): Observable<OlympicCountry[]> {
    if (!this.olympics$) {
      this.olympics$ = this.http
        .get<OlympicCountry[]>(this.olympicUrl);
        
    }
    return this.olympics$;
  }
// retourne un pays ainsi que ses participations en fonction de son identifiant
  public getCountryById(id: number): Observable<OlympicCountry | undefined> {
  return this.getOlympics().pipe(
    map((countries: OlympicCountry[]) =>
      countries.find((country: OlympicCountry) => country.id === id)
    )
  );
}
// retourne le nom d'un pays en fonction de son identifiant
public getCountryNameById(id: number): Observable<string | undefined> {
  return this.getCountryById(id).pipe(
    map((country) => country ? country.country : undefined)
  );
}
// retourne les années de participation d'un pays en fonction de son identifiant
public getYearsById(id: number): Observable<string[]> {
  return this.getCountryById(id).pipe(
    map((country) => {  
      if (!country) {   
        return [];
      }
      return country.participations.map((p) => p.year.toString());
    })
  );
}
// retourne les villes où les JO ont eu lieu pour un pays donné
public getCitiesById(id: number): Observable<string[]> {
  return this.getCountryById(id).pipe(
    map((country) => {      
      if (!country) {   
        return [];
      } 
      return country.participations.map((p) => p.city);
    })
  );
}

// retourne le nombre de médailles obtenues par un pays à chaque participation
public getMedalsById(id: number): Observable<number[]> {
  return this.getCountryById(id).pipe(
    map((country) => {
      if (!country) {   
        return [];
      } 
      return country.participations.map((p) => p.medalsCount);
    })
  );
}
// retourne le nombre d'athlètes envoyés par un pays à chaque participation
public getAthletesById(id: number): Observable<number[]> {
  return this.getCountryById(id).pipe(
    map((country) => {
      if (!country) {   
        return [];
      }
      return country.participations.map((p) => p.athleteCount);
    })
  );
}
// retourne le nombre total de médailles obtenues par un pays
public getMedalsCountById(id: number): Observable<number> {
  return this.getCountryById(id).pipe(
    map((country) => {
      if (!country) {
        return 0;
      }
      return country.participations.reduce(
        (sum, p) => sum + p.medalsCount,
        0
      );
    })
  );
}
// retourne le nombre total d'athlètes envoyés par un pays
public getAthletesCountById(id: number): Observable<number> {
  return this.getCountryById(id).pipe(
    map((country) => {  
      if (!country) {
        return 0;
      }
      return country.participations.reduce(
        (sum, p) => sum + p.athleteCount,
        0
      );
    })
  );
}

// retourne le nombre total de participations d'un pays aux JO
public getTotalParticipationsById(id: number): Observable<number> {
  return this.getCountryById(id).pipe(
    map((country) => {
      if (!country) {
        return 0;
      }   
      return country.participations.length;
    })
  );
}
// retourne le nombre total de pays participants aux JO
  public getTotalCountries(): Observable<number> {
    return this.getOlympics().pipe(
      map((countries: OlympicCountry[]) => countries.length)
    );
  }
// retourne le nombre total de participations aux JO
  public getTotalParticipations(): Observable<number> {
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
// retourne le nombre total de médailles obtenues par tous les pays participants aux JO
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
// retourne le nombre total d'athlètes envoyés par tous les pays participants aux JO
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
  // retourne les labels (noms des pays) et les données (nombre de médailles) pour tous les pays participants aux JO
  // TRIER PAR ordre alphabétique des pays
  public getMedalsByCountry(): Observable<{ labels: string[]; data: number[] }> {
    return this.getOlympics().pipe(
      map((countries: OlympicCountry[]) => {
      const sorted = [...countries].sort((a, b) =>
        a.country.localeCompare(b.country)
      );
      const labels = sorted.map(c => c.country);
      const data = sorted.map(c =>
        c.participations.reduce((sum, p) => sum + p.medalsCount, 0)
      );
      return { labels, data };
    })
    );
  }

}

