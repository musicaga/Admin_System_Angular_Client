import { Component, OnInit, Input } from '@angular/core';
import { FormMainGroup, MaterialFormData, FormModel } from '../../dynamic-form.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css']
})
export class SimpleFormComponent implements OnInit {
  @Input() public mainGroups: FormMainGroup[];
  @Input() public form: FormGroup;
  @Input() public materialData: MaterialFormData;
  @Input() public model: FormModel;
  constructor() { }

  ngOnInit() {
  }
}