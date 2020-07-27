import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'oc-label',
  templateUrl: './oc-label.component.html',
  styleUrls: ['./oc-label.component.scss']
})
export class OcLabelComponent implements OnInit {
  @Input() text;
  @Input() class;

  constructor() { }

  ngOnInit(): void {
  }

}
