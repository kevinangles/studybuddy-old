import { Component, OnInit } from '@angular/core';
import { HomeService } from '.././home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(private homeService: HomeService, private route: ActivatedRoute) { }

  sections;

  ngOnInit() {
    const code = this.route.snapshot.params.code;
    this.homeService.getResults(code).subscribe(data => this.sections = data);
  }

}
