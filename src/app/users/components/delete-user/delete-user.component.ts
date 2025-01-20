import { Component, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  standalone: false,

  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {

  constructor(
    public matDialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject the data passed from the dialog opener
    private toaster: ToastrService
  ) { }

  onNoClick(): void {
    this.matDialogRef.close('No');
    this.toaster.info('User not deleted');
  }

  onOkClick(): void {
    console.log(this.data, "data");  // You should have 'data' containing the user you want to delete

    // Retrieve the users array from localStorage
    let users = JSON.parse(localStorage.getItem('user') || '[]');

    // Find the index of the user to delete by matching the user ID
    const userIndex = users.findIndex((user: any) => user.id == this.data.user.id);  // Assuming 'this.data' has the 'id' of the user to delete

    if (userIndex !== -1) {
      // If user is found, remove the user from the array
      users.splice(userIndex, 1);  // Removes the user at the found index
      // Save the updated users array back to localStorage
      localStorage.setItem('user', JSON.stringify(users));

      // Close the dialog and show success message
      this.matDialogRef.close('Ok');
      this.toaster.success('User deleted successfully');
      window.location.reload();

    } else {
      // If user not found, you can handle the error here
      this.toaster.error('User not found');
    }
  }


}
