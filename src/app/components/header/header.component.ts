import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  @Input() titlePage!: string;
  @Input() descriptionPage!: string;

  @Input() totalCountries?: number;
  @Input() totalJos?: number;
  @Input() totalMedals?: number;
  @Input() totalAthletes?: number;

  // Spécifique pour la page country
  @Input() countryName?: string;
  @Input() participations?: number;s = 0;
}
