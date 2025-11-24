import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
})
export class CountryCardComponent {
  @Input() public countryName = '';
  @Input() public totalEntries = 0;
  @Input() public totalMedals = 0;
  @Input() public totalAthletes = 0;
}
