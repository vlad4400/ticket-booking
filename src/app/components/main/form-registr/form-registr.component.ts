import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-registr',
  templateUrl: './form-registr.component.html',
  styleUrls: ['./form-registr.component.scss']
})
export class FormRegistrComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    alert('Projekt w fazie rozwoju');
  }

}
