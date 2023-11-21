import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogAddedUserComponent } from '../dialog-added-user/dialog-added-user.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{




  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}
  user: User = new User();
  firestore: Firestore = inject(Firestore);
  userId!:string;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      let user$ = docData(this.getSingleDocRef('users', this.userId));
      user$.subscribe((user:any) => {
        this.user = new User(user);
        console.log(this.user);
        
      }) 
    })
  }

  getSingleDocRef(colID: string, docID: string) {
    return doc(collection(this.firestore, colID), docID);
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.getJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editUserDetails() {
    const dialog = this.dialog.open(DialogAddedUserComponent);
    dialog.componentInstance.user = new User(this.user.getJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
