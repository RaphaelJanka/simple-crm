import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  
})
export class UserComponent implements OnInit {
  above: TooltipPosition = "above";
  user = new User();
  allUsers: User[] = [];
  firestore: Firestore = inject(Firestore);
  subscription!: any;
  id!: string;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getUserData();
  }


  openDialog(): void {
    this.dialog.open(DialogAddUserComponent)
  }

  getUserRef() {
    return collection(this.firestore, 'users')
  }

  getUserData() {
    let usersColRef = this.getUserRef();
    this.subscription = onSnapshot(usersColRef, (snapshot) => {
      this.allUsers = snapshot.docs.map(doc => {
        const userData = doc.data() as User;
        userData.id = doc.id;
        return userData;
      });
    });
  }
}
