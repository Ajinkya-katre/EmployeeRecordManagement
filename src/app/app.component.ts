import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { Employee } from './models/employee.model';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('addEmployeeButton') addEmployeeButton:any

  title = 'employee';

  reactiveForm:any = FormGroup;

  employees:Employee[];
  employeesToDisplay:Employee[];
  constructor(private fb:FormBuilder, private employeeService:EmployeeService){  
    this.reactiveForm = fb.group
    this.employees = [];
    this.employeesToDisplay = this.employees;
  }
  ngOnInit(): void {

    this.reactiveForm = this.fb.group({
        firstname:this.fb.control(''),
        lastname:this.fb.control(''),
        jobtitle:this.fb.control(''),
        salary:this.fb.control(''),
        datepicker:this.fb.control(''),

    })

    this.employeeService.getEmployee().subscribe(res => {
      for(let empl of res){
        this.employees.push(empl)
      }
      this.employeesToDisplay = this.employees;
    })
 
    
  }

  addEmployee(){
    let employee : Employee = {
      firstname:this.Firstname.value,
      lastname:this.Lastname.value,
      jobtitle:this.Jobtitle.value,
      salary:this.Salary.value,
      datepicker:this.Datepicker.value
    }

    this.employeeService.postEmployee(employee).subscribe((res)=>{
      this.employees.push(res);
      this.clearForm();
    })
  }

  removeEmployee(event:any){
      this.employees.forEach((val,index)=>{
        if(val.id === parseInt(event)){
          this.employeeService.deleteEmployee(event).subscribe((res)=>{
            this.employees.splice(index,1);
          })
        }
      })
  }

  editEmployee(event:any){

    this.employees.forEach((val,index)=>{
      if(val.id === event){
        this.setForm(val);
      }
    })
    this.removeEmployee(event);
    this.addEmployeeButton.nativeElement.click();
  }

  searchEmployees(event:any){
    let filteredEmp:Employee[];
    if(event === ''){
        this.employeesToDisplay = this.employees;
    }else{
      filteredEmp = this.employees.filter((val,index) =>{
        let targetkey = val.firstname.toLowerCase() + '' + val.lastname.toLowerCase();
        let searchkey = event.toLowerCase();
        return targetkey.includes(searchkey);
      })
      this.employeesToDisplay = filteredEmp;
    }
  }

  setForm(emp:Employee){
      this.Firstname.setValue(emp.firstname);
      this.Lastname.setValue(emp.lastname);
      this.Jobtitle.setValue(emp.jobtitle);
      this.Salary.setValue(emp.salary);
      this.Datepicker.setValue(emp.datepicker);

  }

  clearForm(){
    this.Firstname.setValue(''),
    this.Lastname.setValue(''),
    this.Jobtitle.setValue(''),
    this.Salary.setValue(''),
    this.Datepicker.setValue('')

  }

  public get Firstname() : FormControl {
    return this.reactiveForm.get('firstname') as FormControl;
  }
  
  public get Lastname() : FormControl {
    return this.reactiveForm.get('lastname') as FormControl;
  }
  public get Jobtitle() : FormControl {
    return this.reactiveForm.get('jobtitle') as FormControl;
  }
  public get Salary() : FormControl {
    return this.reactiveForm.get('salary') as FormControl;
  }
  
  public get Datepicker() : FormControl {
    return this.reactiveForm.get('datepicker') as FormControl;
  }
}
