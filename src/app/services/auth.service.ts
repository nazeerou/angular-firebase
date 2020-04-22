import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  newUser: any;
  sign_out: any;

  users: Observable<User[]>;

  user: any;
  user_id: string;
  private eventAuthError = new BehaviorSubject<string>("");

  eventAuthError$ = this.eventAuthError.asObservable();
  constructor(
   public afa: AngularFireAuth,
   public afs: AngularFirestore,
   public router: Router,
  ) { 
    this.afa.user.subscribe((data => {
      this.user = data;
   }))
  }


  getUserState() {
    return this.afa.authState;
  }

  getUserDetails() {
      // this.user_id = this.user.uid;
      return this.afs.collection("USERS").snapshotChanges();
  }

  createAccount(user){

    console.log("USERS", user);
       console.log("User Account", user);
       this.afa.auth.createUserWithEmailAndPassword(user.email, user.password)
          .then( userCredential => {
           this.newUser = user;
            console.log("User", userCredential);
            userCredential.user.updateProfile({
                displayName: user.name
            });
           this.insertUserData(userCredential)
            .then(() => {
              alert("Success");
               this.router.navigate(['/create-account']);
              // console.log("Logged In");
            })
          }).catch( error => {
              console.log(error.message)
              this.eventAuthError.next(error);
              console.log("Error");         
        })  
    }

    insertUserData(userCredential: firebase.auth.UserCredential) {
      
      return this.afs.doc(`USERS/${userCredential.user.uid}`).set({
             email: this.newUser.email,
             name: this.newUser.name,
             role: this.newUser.type,
             uuid: userCredential.user.uid
       })
    }

 login(email: string, password: string){
        this.afa.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        this.afa.auth.signInWithEmailAndPassword(email, password)
        .then( userCredential => {
          if(userCredential) {
            console.log("Logged in", userCredential)
            this.router.navigate(['/home'])
          }
        }).catch((error)=>{
          console.log(error.message)
          this.eventAuthError.next(error);
          console.log("Error");
        })
      })
    }
  
 googleAuth() {
     return this.authLogin(new firebase.auth.GoogleAuthProvider());
 }   

 authLogin(provider) {
     return this.afa.auth.signInWithPopup(provider)
     .then((result) => {
       console.log("logged in");
       this.router.navigate(['/home'])
     }).catch((error) => {
      console.log("error", error);
     })
 }


 
}
