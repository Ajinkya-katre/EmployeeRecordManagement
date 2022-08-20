import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-empdetails',
  templateUrl: './empdetails.component.html',
  styleUrls: ['./empdetails.component.css']
})
export class EmpdetailsComponent implements OnInit {

  @Input() employee : Employee;
  @Output() onRemoveEmployee = new EventEmitter<number>(); 
  @Output() onEditEmployee = new EventEmitter<number>(); 

  constructor() { 
    this.employee ={
      firstname:'',
      lastname:'',
      jobtitle:'',
      salary:0,
      datepicker:''
    }
  }

  ngOnInit(): void {
  }

  deleteEmployeeClicked(){
    this.onRemoveEmployee.emit(this.employee.id);
  }

  editEmployeeClicked(){
    this.onEditEmployee.emit(this.employee.id);
  }

}
