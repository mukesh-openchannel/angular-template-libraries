import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'oc-app-category-select',
  templateUrl: './oc-app-category-select.component.html',
  styleUrls: ['./oc-app-category-select.component.scss']
})
export class OcAppCategorySelectComponent implements OnInit {

  constructor() { }

  @Input() predefinedValArr;

  @Output() predefinedValCahnge = new EventEmitter();

  @Input() defaultBlankValue='Select Cateory';

  @Input() addButtonLable = '+ Add Category'

  @Input() selectedValuesArr: string[]=[];

  @Output() selectedValuesArrChange = new EventEmitter();

  @Output() selectionChange = new EventEmitter();

  
  currentSelectedVal='';
  ngOnInit(): void {
  
  }

  onSelectionChange($event){
    this.currentSelectedVal=$event.target.value;
    this.selectionChange.emit($event);
  }

  addCategory(){
    if(this.currentSelectedVal && this.currentSelectedVal.trim().length>0){
      var index = this.predefinedValArr.indexOf(this.currentSelectedVal);
      if (index !== -1) {
        this.predefinedValArr.splice(index, 1);
      }
      this.selectedValuesArr.push(this.currentSelectedVal);
      this.currentSelectedVal=''
      this.predefinedValCahnge.emit();
      this.selectedValuesArrChange.emit();
      // this.addNewCategory.emit(this.currentSelectedVal);
    }
  }
}
