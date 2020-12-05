import { Component, OnInit } from '@angular/core';
import { LoaderService } from './shared/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cocktail';
  loader = false;
  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.loaderService.loader.subscribe(v => {
      this.loader = v;
    });
  }
}
