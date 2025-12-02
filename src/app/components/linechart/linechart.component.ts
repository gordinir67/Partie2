import { Component, ElementRef, Input, OnChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-linechart',
  standalone: true,
  imports: [],
  templateUrl: './linechart.component.html',
  styleUrl: './linechart.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LinechartComponent implements OnChanges {

  @ViewChild('countryChart', { static: true })
  public countryChartRef!: ElementRef<HTMLCanvasElement>;
  
  public lineChart: Chart<'line', number[], string> | null = null;

  @Input() public years: string[] = [];
  @Input() public medalsOverTime: number[] = [];
  @Input() public athletesOverTime: number[] = [];

  public ngOnChanges(): void {
    if (this.years.length > 0 && this.medalsOverTime.length > 0 && this.athletesOverTime.length > 0) {
      this.buildChart();
    }
  }
    private buildChart(): void {
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

      public ngOnDestroy(): void {
    if (this.lineChart) {
      this.lineChart.destroy();
    }
  }

  }


