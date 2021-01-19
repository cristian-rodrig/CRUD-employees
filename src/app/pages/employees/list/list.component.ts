import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { EmployeesService } from '../employees.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  employees$ = this.employeesSvc.employees;
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  

  constructor(private router: Router,
              private employeesSvc : EmployeesService) { }

  ngOnInit(): void {
  }

  onEdit( item: any ):void{
    this.navigationExtras.state.value = item;
    this.router.navigate(['edit'], this.navigationExtras )
  }

  async onDelete( empId: string ):Promise<void>{
    try {
      await this.employeesSvc.onDeleteEmployees(empId);
      Swal.fire('Deleted...', 'The employee has been deleted!', 'success'); 
    } catch (error) {
      Swal.fire('Oops...', 'Something went wrong!', error);      
    }
  
  }

  onSeeMore( item: any ):void{
    this.navigationExtras.state.value = item ;
    this.router.navigate(['details'], this.navigationExtras);
  }
}
