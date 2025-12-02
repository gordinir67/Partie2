import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ActiveElement, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-medal-chart',
  templateUrl: './medal-chart.component.html',
  styleUrls: ['./medal-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MedalChartComponent implements OnChanges {
  
  @Input() public labels: string[] = [];
  @Input() public data: number[] = [];
  @Input() public countryIds: number[] = [];
  @Output() public countrySelected = new EventEmitter<number>();

  @ViewChild('medalChartCanvas', { static: false })
  public medalChartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart<'pie', number[], string> | null = null;


  public ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['labels'] || changes['data']) &&
      this.medalChartCanvas &&
      this.medalChartCanvas.nativeElement
    ) {
      if (this.chart) {
        this.chart.destroy();
      }
      if (this.labels.length > 0 && this.data.length > 0) {
        this.buildChart();
      }
    }
  }

  private buildChart(): void {
    this.chart = new Chart(this.medalChartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Medals',
            data: this.data,
          },
        ],
      },
      options: {
          responsive: true,
  maintainAspectRatio: false, 
        aspectRatio: 2.5,
        onClick: (event: ChartEvent, elements: ActiveElement[], chart: Chart) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const labels = chart.data.labels as string[] | undefined;
            if (this.countryIds && this.countryIds[index] !== undefined) {
            this.countrySelected.emit(this.countryIds[index]);
            }

          }
        },
      },
    });
  }
}
