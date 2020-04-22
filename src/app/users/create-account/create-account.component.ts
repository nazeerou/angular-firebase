import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { Role } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  roles: Role[];

  constructor(
      private service: ServicesService,
      private auth: AuthService
  ) { }

  ngOnInit() {
    this.getRoles();
  }


  getRoles() {
    this.service.fetchRoles().subscribe(data => {
      this.roles = [];
        data.forEach(a => {
        let item: any = a.payload.doc.data();
             item.id = a.payload.doc.id; 
             this.roles.push(item);
        });
      console.log("Roles", this.roles);
     });
   }

   createAccount(form) {
     console.log("", form);
    this.auth.createAccount(form.value);
   }

}
