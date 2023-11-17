import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
   
  }
  onNoClick() {}

  closeDialog() {
    this.dialogRef.close();
  }
  async saveUser() {
    this.user.birthday = this.birthDate.getTime();
    console.log('Current user is', this.user);
    this.isLoading = true;
    await addDoc(this.getUserRef(), this.user.getJSON())
    .catch((err) => {
      console.log(err);
    })
    .then((result: any) => {
      this.isLoading = false;
      this.closeDialog();
      console.log('Added User', result);
      
    })
  }

  getUserRef() {
    return collection(this.firestore, 'users')
  }

}
