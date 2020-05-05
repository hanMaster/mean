import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { Observable } from 'rxjs';
import { OverviewPage } from '../shared/interfaces';
import * as moment from 'moment';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tapTarget') tapTargetRef: ElementRef

  dateOverview: string = moment().add(-1, 'd').format('DD.MM.YYYY');
  tapTarget: MaterialInstance
  info$: Observable<OverviewPage>;
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.info$ = this.analyticsService.getOverview();
  }

  ngAfterViewInit() {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)
  }

  ngOnDestroy() {
    this.tapTarget.destroy()
  }

  openInfo(){
    this.tapTarget.open()
  }
}
