import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent<T> implements OnInit {
  @Input('columns') columns: Array<String>;
  @Input('data') data: Array<T>;

  constructor() { }

  ngOnInit(): void {
  }

}
