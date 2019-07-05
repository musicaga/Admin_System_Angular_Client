import { Component, OnInit, Input } from '@angular/core';
import { FormTabs } from '../../dynamic-form.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tabs-form',
  templateUrl: './tabs-form.component.html',
  styleUrls: ['./tabs-form.component.css']
})
export class TabsFormComponent implements OnInit {
  @Input() public tabs: FormTabs[];
  @Input() public form: FormGroup;
  @Input() public appearance: string;
  @Input() public id: string;
  constructor() { }

  ngOnInit() {
  }

}
