import { Component, OnInit } from '@angular/core';
import { Customers } from 'src/app/models/customers';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomersService } from 'src/app/services/customers.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  //Initialize variables
  customers: Customers[] = [];
  customersForm: FormGroup;
  id: number = 0;
  createMode: boolean = false;
  editMode: boolean = false;
  createText: string = "Create Customer";

  constructor(private fb: FormBuilder, private customersService: CustomersService) {
    //Initialize form
    this.customersForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      city: ["", [Validators.required]],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      phone: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customersService.getCustomers().subscribe((data) => {
      this.customers = data;
    }),
      (error) => {
        console.error(error, "Error");
      };
  }

  deleteCustomer(id: any) {
    this.customersService.deleteCustomer(id).subscribe((data) => {
      Notify.success('Reader deleted sussesfully!');
      this.getCustomers();
    }),
      (error) => {
        console.error(error, "Error");
      };
  }

  cleanData() {
    this.customersForm.setValue({
      name: "",
      city: "",
      email: "",
      phone: "",
    });
  }

  editCustomer(id: any) {
    const customer = this.customers.find((c) => c.id === id);
    this.createText = "Update Customer";
    if (!!customer) {
      this.createMode = true;
      this.editMode = true;
      this.customersForm.setValue({
        name: customer.name,
        city: customer.city,
        email: customer.email,
        phone: customer.phone,
      });
      this.id = id;
    }
  }

  createCustomer() {
    if (this.createMode) {
      this.createMode = false;
    } else {
      this.createMode = true;
    }
    this.cleanData();
    this.editMode = false;
    this.createText = "Create Customer";
  }

  addCustomer() {
    let customer = {
      name: this.customersForm.get("name")?.value,
      city: this.customersForm.get("city")?.value,
      email: this.customersForm.get("email")?.value,
      phone: this.customersForm.get("phone")?.value,
    };
    if (!this.editMode) {
      if (this.customersForm.valid) {
        console.log('Adding', customer);
        this.customersService.createCustomer(customer).subscribe(
          (res: any) => {
            Notify.success('Reader created sussesfully!');
            this.cleanData();
            this.createMode = false;
            this.getCustomers();
          },
          (err) => {
            Notify.failure = err.error.message;
          }
        );
      } else {
        Notify.warning('Please fill all the fields');
      }
    }
    else {
      if (this.customersForm.valid) {
        console.log('Updating', customer);
        this.customersService.updateCustomer(customer, this.id).subscribe(
          (res: any) => {
            Notify.success('Reader updated sussesfully!');
            this.createMode = false;
            this.getCustomers();
            this.cleanData();
          },
          (err) => {
            Notify.failure = err.error.message;
          }
        );
      }else {
        Notify.warning('Please fill all the fields');
      }
    }
  }
}
