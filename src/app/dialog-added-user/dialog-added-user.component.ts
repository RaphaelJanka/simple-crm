import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { using } from 'rxjs';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-added-user',
  templateUrl: './dialog-added-user.component.html',
  styleUrls: ['./dialog-added-user.component.scss']
})
export class DialogAddedUserComponent {
  isLoading = false;
  user!: User;
  birthDate!: Date;
  userId!: string;
  firestore: Firestore = inject(Firestore);
  constructor(public dialogRef: MatDialogRef<DialogAddedUserComponent>) {}


  onNoClick() {
    this.dialogRef.close()
  }

  async saveUser() {
    if (this.birthDate) {
      this.user.birthday = this.birthDate.getTime();
    }
    this.isLoading = true;
    await updateDoc(this.getSingleDocRef('users', this.userId), this.user.getJSON())
    .catch((err) => {
      console.log(err);
    })
    .then((result: any) => {
      this.isLoading = false;
      this.closeDialog();
      console.log('Added User', result);
    })
  }


  closeDialog() {
    this.dialogRef.close();
  }

  getSingleDocRef(colID: string, docID: string) {
    return doc(collection(this.firestore, colID), docID);
  }

}
