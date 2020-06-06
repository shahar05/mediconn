import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(component: ComponentType<any>, data: any) {
    const dialogRef = this.dialog.open(component, {
      data
    });
    return dialogRef;
  }

}
