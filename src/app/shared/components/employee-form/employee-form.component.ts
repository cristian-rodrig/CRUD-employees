import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../header/models/employee.interface';
import { EmployeesService } from '../../../pages/employees/employees.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employee : Employee;
  employeeForm: FormGroup;
  private isEmail = /\+@\S+\.\S+/ ;

  constructor(private router: Router,
              private fb: FormBuilder,
              private employeesSvc: EmployeesService) {
    const navigation = this.router.getCurrentNavigation();
    this.employee = navigation?.extras?.state?.value;
    this.initForm();

   }

  ngOnInit(): void {
    
    if( typeof this.employee === 'undefined'){
      this.router.navigate(['new']);
    }else{
      this.employeeForm.patchValue(this.employee);
    }
  }

  onSave(){
    console.log('save', this.employeeForm.value);
    if(this.employeeForm.valid){
      const employee = this.employeeForm.value;
      const employeeId = this.employee?.id || null;
      this.employeesSvc.onSaveEmployee( employee, employeeId );
      Swal.fire('OK...', 'Empleado guardado correctamente', 'success')
      this.employeeForm.reset();
    }

  }

  isValidField(field: string): string{
    const validatedField = this.employeeForm.get(field);
    return (!validatedField.valid && validatedField.touched)
    ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }


  private initForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['' , [Validators.required, Validators.email]],
      startDate: ['' , [Validators.required]],

    })
  }

  onGoBackToList():void{
    this.router.navigate(['list']);
  }

}
