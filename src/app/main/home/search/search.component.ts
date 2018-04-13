import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  gifs: Array<any>;
  page = 1;
  pageSize = 10;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.form = new FormGroup({
      'search': new FormControl(null, [Validators.required])
    });
  }
  onSubmit() {
    const search = this.form.value.search;
    console.log(this.form);
    this.searchService.searchGif(search)
      .subscribe(data => {
        console.log(data.data);
        this.gifs = data.data;
      });
  }
  pageChange(event) {
    this.page = event;
  }
}
