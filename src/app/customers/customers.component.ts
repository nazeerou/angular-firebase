import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { User } from '../models/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  agents: User[];
  customers: User[];
  user_agents: User[];
  user_customers: User[];
  agent_id: string;
  agentList: boolean = true;
  assignForm: boolean = false;
  notFound: boolean = true;

  constructor(
    public service: ServicesService,
    public authService: AuthService,
    public afs: AngularFirestore,
    public route: ActivatedRoute
  ) { 
    this.agent_id = this.route.snapshot.params['id']
  }

  ngOnInit() {

    this.getCustomers(this.agent_id);
    this.getAllCustomers();

  }

  addBtn() {
    this.agentList = false;
    this.notFound = false;
    this.assignForm = !this.assignForm;
  }

  addCustomer(form: NgForm) {
      let data  =  {
                  agent_id: this.agent_id,
                  customer_id: form.value.name.id,
                  name: form.value.name.name,
                  email: form.value.name.email,
                  role: form.value.name.role,
                  } 
          const add = this.afs.collection('CUSTOMERS').add(data);
     
          if(add) {
            alert("Success");
          } else {
            alert("Error");
          }
    }
  
  getCustomers(agent_id) {
    this.service.fetchCustomers(agent_id).subscribe(data => {
      this.customers = [];
        data.forEach(a => {
        let item: any = a.payload.doc.data();
             item.id = a.payload.doc.id; 
             this.customers.push(item);
        });
      console.log("User details", this.customers);
    });
   }

   getAllCustomers() {
    this.service.fetchAllCustomers().subscribe(data => {
      this.user_customers = [];
        data.forEach(a => {
        let item: any = a.payload.doc.data();
             item.id = a.payload.doc.id; 
             this.user_customers.push(item);
        });
      console.log("User details", this.user_customers);
    });
   }

}
