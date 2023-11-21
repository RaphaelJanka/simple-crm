import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogAddedUserComponent } from '../dialog-added-user/dialog-added-user.component';
import { Firestore, addDoc, collection, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  isLoading = false;
  user!: User;
  userId!: string; 
  firestore: Firestore = inject(Firestore);
  constructor(public dialogRef: MatDialogRef<DialogAddedUserComponent>) {
    
  }
  onNoClick() {
    this.dialogRef.close();
  }




  ngOnInit(): void {
  
  }

  async saveUser() {
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
    this.dialogRef.close()
  }

  getSingleDocRef(colID: string, docID: string) {
    return doc(collection(this.firestore, colID), docID);
  }
}
