import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropdownModel, SelectModel} from 'oc-ng-common-service';

@Component({
  selector: 'oc-dropdown',
  templateUrl: './oc-dropdown.component.html',
  styleUrls: ['./oc-dropdown.component.scss']
})
export class OcDropdownComponent implements OnInit {

  @Output()
  selectedChange: EventEmitter<DropdownModel<any>> = new EventEmitter<DropdownModel<any>>();

  @Input()
  selected: DropdownModel<any>;

  @Input()
  title: string = 'Sort by';

  @Input()
  options: DropdownModel<any>[];

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(selected: DropdownModel<any>) {
    this.selected = selected;
    this.selectedChange.emit(selected);
  }
}
