import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  users: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore
  ) {
    this.users = this.authService.getUserState
   }

  ngOnInit() {
  }


  sign(form) {
    this.authService.login(form.value.email, form.value.password);
  }

}
