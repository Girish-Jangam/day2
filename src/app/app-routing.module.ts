import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchDestinationComponent } from './search-destination/search-destination.component';
import { DestinationDetailComponent } from './destination-detail/destination-detail.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { GroupComponent } from './group/group.component';
import { JoinGroupComponent } from './join-group/join-group.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:"" ,component:HomeComponent
  },
  {
    path: "search", component: SearchDestinationComponent,
  },
  {
    path: "destinations", component: SearchDestinationComponent
  },
  {
    path: "destinations/:id", component: DestinationDetailComponent
  },
  {
    path: "wishlist", component: FavoriteComponent
  },
  {
    path:"login" ,component:LoginComponent 
  },
  {
    path:"register" ,  component:RegisterComponent
  },
  {
     path: 'create-trip-groups', component: GroupComponent 
    },  // Route for Create Group page
  {
     path: 'join-trip-groups', component: JoinGroupComponent 
    },
    { 
      path: 'chat/:id', component: ChatComponent 

    },
  {
    path: "**", redirectTo: "/", pathMatch: "full"
  }
  // { path: 'groups', component: GroupComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
