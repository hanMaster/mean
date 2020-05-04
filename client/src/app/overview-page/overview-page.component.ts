import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { Observable, Subscription } from 'rxjs';
import { OverviewPage } from '../shared/interfaces';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
})
export class OverviewPageComponent implements OnInit {
  info$: Observable<OverviewPage>;
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.info$ = this.analyticsService.getOverview();
  }
}
