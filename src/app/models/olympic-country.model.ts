import { Participation } from './participation.model';

export interface OlympicCountry {
  id: number;
  country: string;
  participations: Participation[];
}