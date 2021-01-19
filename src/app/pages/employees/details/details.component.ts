import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Employee } from '../../../shared/components/header/models/employee.interface';
import { EmployeesService } from '../employees.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  
  employee: Employee = null;

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private router: Router,
              private employeesSvc: EmployeesService,
              ) {

    const navigation = this.router.getCurrentNavigation();
    this.employee = navigation?.extras?.state?.value;
   }

  ngOnInit(): void {
    if(typeof(this.employee)==="undefined"){
      this.router.navigate(['list']);
    }
  }

  onEdit():void{
    this.navigationExtras.state.value = this.employee;
    this.router.navigate(['edit'], this.navigationExtras )
  }
  
  onGoBackToList(): void{
    this.router.navigate(['list'])
  }

  async onDelete(): Promise<void>{
      try {
      await this.employeesSvc.onDeleteEmployees(this.employee?.id);
      this.onGoBackToList();
      Swal.fire('Deleted...', 'The employee has been deleted!', 'success'); 
    } catch (error) {
      Swal.fire('Oops...', 'Something went wrong!', error);      
    }
  }

}
