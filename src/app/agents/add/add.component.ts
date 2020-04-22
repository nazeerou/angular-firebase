import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  agents: User[];
  user_agents: User[];
  supervisor_id: string;
  agentList: boolean = true;
  assignForm: boolean = false;
  notFound: boolean = true;

  constructor(
    public service: ServicesService,
    public authService: AuthService,
    public afs: AngularFirestore,
    public route: ActivatedRoute
  ) { 
    this.supervisor_id = this.route.snapshot.params['id']
  }

  ngOnInit() {

    this.getAgents(this.supervisor_id);
    this.getAllAgents();
  }

  addBtn() {
    this.agentList = false;
    this.notFound = false;
    this.assignForm = !this.assignForm;
  }

  addAgent(form: NgForm) {
      let data  =  {
                  supervisor_id: this.supervisor_id,
                  agent_id: form.value.name.id,
                  name: form.value.name.name,
                  email: form.value.name.email,
                  role: form.value.name.role,
                  } 
          const add = this.afs.collection('AGENTS').add(data);
     
          if(add) {
            alert("Success");
          } else {
            alert("Error");
          }
    }
  
  getAgents(supervisor_id) {
    this.service.fetchAgents(supervisor_id).subscribe(data => {
      this.agents = [];
        data.forEach(a => {
        let item: any = a.payload.doc.data();
             item.id = a.payload.doc.id; 
             this.agents.push(item);
        });
      console.log("User details", this.agents);
    });
   }

   getAllAgents() {
    this.service.fetchAllAgents().subscribe(data => {
      this.user_agents = [];
        data.forEach(a => {
        let item: any = a.payload.doc.data();
             item.id = a.payload.doc.id; 
             this.user_agents.push(item);
        });
      console.log("User details", this.user_agents);
    });
   }

}
