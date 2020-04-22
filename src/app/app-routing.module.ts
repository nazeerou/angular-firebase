import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './users/create-account/create-account.component';
import { HomeComponent } from './home/home.component';
import { AgentsComponent } from './agents/agents.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { AddComponent } from './agents/add/add.component';
import { Route } from '@angular/compiler/src/core';


const routes: Routes = [
   { 
    path: '', 
    component: LoginComponent
   },
   { 
    path: 'login', 
    component: LoginComponent
   },
   { 
    path: 'create-account', 
    component: CreateAccountComponent
   },
   { 
    path: 'home',
    component: HomeComponent,
   },
   { 
    path: 'home',
    component: DashboardComponent,
     children: [
       { 
        path: 'agents', component: AgentsComponent
       },
       { 
        path: 'agents/:id', component: AddComponent,
       },
       { 
        path: 'agents/:id/customers/:id', component: CustomersComponent,
       },
    ]
   },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
