import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { Observable } from 'rxjs';
import { OverviewPage } from '../shared/interfaces';
import * as moment from 'moment';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
})
export class OverviewPageComponent implements OnInit {
  dateOverview: string = moment().add(-1, 'd').format('DD.MM.YYYY');
  info$: Observable<OverviewPage>;
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.info$ = this.analyticsService.getOverview();
  }
}
