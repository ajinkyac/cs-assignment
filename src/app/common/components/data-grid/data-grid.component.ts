import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { faCircle, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Status } from '../../types/type';
import { findAncestor } from '../../utils';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent<T> {
  @Input() columns: Array<string>;
  @Input() rows: Array<string>;
  @Input() data: Array<T>;
  @Input() actionControlledBy: object;
  @Output() notifyParent: EventEmitter<object> = new EventEmitter();

  @ViewChild('selectAllChkbox') selectAllChkbox: ElementRef;
  @ViewChild('gridBody') gridBody: ElementRef;

  public status: typeof Status = Status;
  public selectedRows: Array<T> = [];
  public faDownload = faDownload;
  public faCircle = faCircle;
  public availableForDownload: Array<T> = [];

  // Avoid lint errors
  private labelKey = 'key';
  private labelValue = 'value';
  private labelId = 'id';

  selectAll(element: HTMLInputElement): void {
    const allTableRows = this.gridBody.nativeElement.querySelectorAll('tr');
    const allCheckboxes = this.gridBody.nativeElement.querySelectorAll('input[type=checkbox]');
    const selectAll = element.checked;
    this.selectedRows.length = 0;
    this.availableForDownload.length = 0;

    if (element.checked) {
      // remove all the checked entries if present already and add all the rows with sequenced index values to avoid any bugs
      // while removing the rows individually.
      this.data.forEach((item, index) => {
        this.selectedRows.push({
          id: index,
          ...item
        });

        if (item[this.actionControlledBy[this.labelKey]] === this.actionControlledBy[this.labelValue]) {
          this.availableForDownload.push({
            id: index,
            ...item
          });
        }
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

  selectRow(element: HTMLInputElement, row: T, index: number): void {
    console.log(this.selectedRows);
    if (element.checked) {
      // add the object to the selectedRows array
      // the id will help to remove the entry since we do not want any coupling w.r.t the keys in the row object.
      this.selectedRows.push({
        id: index,
        ...row
      });

      if (row[this.actionControlledBy[this.labelKey]] === this.actionControlledBy[this.labelValue]) {
        this.availableForDownload.push({
          id: index,
          ...row
        });
      }
    } else {
      // remove the object from the selectedRows array
      let indexToRemove = this.selectedRows.findIndex(item => item[this.labelId] === index);
      this.selectedRows.splice(indexToRemove, 1);
      if (row[this.actionControlledBy[this.labelKey]] === this.actionControlledBy[this.labelValue]) {
        // remove the object from availableToDownload array if it is being unchecked
        indexToRemove = this.availableForDownload.findIndex(item => item[this.labelId] === index);
        this.availableForDownload.splice(indexToRemove, 1);
      }
    }

    // set/unset the row color
    const rowElement = findAncestor(element, 'row');
    rowElement.setAttribute('className', element.checked ? 'row-selected' : '');

    // set/unset indeterminate state of the selectAll checkbox
    this.toggleCheckboxState();
  }

  download(): void {
    this.notifyParent.emit({ payload: this.availableForDownload });
  }

  private toggleCheckboxState(): void {
    if (this.selectedRows.length === this.data.length) {
      // if all the checkboxes are checked
      this.selectAllChkbox.nativeElement.indeterminate = false;
      this.selectAllChkbox.nativeElement.className = '';
      this.selectAllChkbox.nativeElement.checked = true;
    } else if (this.selectedRows.length > 0) {
      // if one or more checkbox(es) are checked
      this.selectAllChkbox.nativeElement.indeterminate = true;
      this.selectAllChkbox.nativeElement.className = 'indeterminate';
    } else {
      // if none are checked
      this.selectAllChkbox.nativeElement.indeterminate = false;
      this.selectAllChkbox.nativeElement.className = '';
      this.selectAllChkbox.nativeElement.checked = false;
    }
  }
}
