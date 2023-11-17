import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {TooltipPosition } from '@angular/material/tooltip';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  
})
export class UserComponent {
  above: TooltipPosition = "above";
  user = new User();
  constructor(public dialog: MatDialog) {
  }



  openDialog(): void {
    this.dialog.open(DialogAddUserComponent)
  }
}
