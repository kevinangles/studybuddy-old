import { Component, OnInit } from '@angular/core';
import { HomeService } from '.././home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user;

  constructor(private homeService: HomeService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.homeService.getProfile(id).subscribe(data => this.user = data);
  }

}
