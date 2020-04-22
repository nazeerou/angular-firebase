import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(
    private af: AngularFirestore
  ) { }


  fetchRoles() {
        return this.af.collection('ROLES').snapshotChanges();
   }

   fetchSupervisors() {
    return this.af.collection('USERS', ref=> ref.where('role', '==', 'supervisor')).snapshotChanges();
   } 

   fetchAgents(id: string) {
    return this.af.collection('AGENTS', ref => ref.where('supervisor_id', '==', id)).snapshotChanges();
  }

  fetchAllAgents() {
    return this.af.collection('USERS', ref => ref.where('role', '==', 'agent')).snapshotChanges();
  }

  fetchCustomers(id: string) {
    return this.af.collection('CUSTOMERS', ref => ref.where('agent_id', '==', id)).snapshotChanges();
  }

  fetchAllCustomers() {
    return this.af.collection('USERS', ref => ref.where('role', '==', 'customer')).snapshotChanges();
  }
}
