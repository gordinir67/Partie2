import { Component } from '@angular/core';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-error-banner',
  template: `
    <div *ngIf="errorService.message() as message" class="banner">
      {{ message }}
      <button class="close" (click)="close()">×</button>
    </div>
  `,
  styles: [`
    .banner {
      background: #ff5252;
      color: white;
      padding: 16px;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 4px;
      margin: 12px;
    }
    .close {
      background: none;
      border: none;
      color: white;
      font-size: 22px;
      cursor: pointer;
    }
  `]
})
export class ErrorBannerComponent {
  constructor(public errorService: ErrorService) {}

  close() {
    this.errorService.clear();
  }
}
