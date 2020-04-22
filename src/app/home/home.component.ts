import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user_details: User[];
  user: firebase.User;

  user_id: any;
  supervisors: User[];

  constructor(
      public authService: AuthService,
      public service: ServicesService,
      public afAuth: AngularFireAuth
  ) {
     this.afAuth.user.subscribe((data => {
        this.user = data;
     }))
   }

  ngOnInit() {

    this.afAuth.user.subscribe(user => {
      this.user_id = user.uid;
    });
    
    
    this.authService.getUserState;
    this.fetchCurrentUserDetails();
    this.getSupervisors();

  }

  fetchCurrentUserDetails() {
    this.authService.getUserDetails().subscribe(data => {
      this.user_details = [];
        data.forEach(a => {
        let item: any = a.payload.doc.data();
             item.id = a.payload.doc.id; 
             this.user_details.push(item);
        });
      console.log("User details", this.user_details);
    });
   }
  

   getSupervisors() {
    this.service.fetchSupervisors().subscribe(data => {
      this.supervisors = [];
        data.forEach(a => {
        let item: any = a.payload.doc.data();
             item.id = a.payload.doc.id; 
             this.supervisors.push(item);
        });
      console.log("User details", this.supervisors);
    });
   }

}
