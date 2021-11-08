import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent<T> {
  @Input('columns') columns: Array<String>;
  @Input('data') data: Array<T>;

  @ViewChild('selectAllChkbox') selectAllChkbox: ElementRef;
  @ViewChild('gridBody') gridBody: ElementRef;

  public selectedRows: Array<T> = [];

  selectAll(element: HTMLInputElement): void {
    let allTableRows = this.gridBody.nativeElement.querySelectorAll('tr');
    let allCheckboxes = this.gridBody.nativeElement.querySelectorAll('input[type=checkbox]');
    const selectAll = element.checked;
    this.selectedRows.length = 0;

    if (element.checked) {
      // remove all the checked entries if present already and add all the rows with sequenced index values to avoid any bugs while removing the rows individually.
      this.data.forEach((item, index) => {
        this.selectedRows.push({
          id: index,
          ...item
        });
      }); 
    }
    
    // set/unset selected color when rows are selected
    allTableRows.forEach((row: HTMLTableRowElement) => {
      row.setAttribute('className', selectAll ? 'row-selected' : '');
    });
    // set/unset checked: true/false for all checkboxes based on the checked state of the common checkbox
    allCheckboxes.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = selectAll;
    });
  }

  download(): void {
  }
}
