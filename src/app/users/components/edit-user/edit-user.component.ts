import { Component, Inject, OnInit } from '@angular/core';
import { userListModal } from '../../modal/userListModal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  standalone: false,
  
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm!: FormGroup;
  userListModal : userListModal = new userListModal ();
  submitted:boolean =false;
  constructor(
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<EditUserComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: userListModal,
    private toaster: ToastrService
  ) {
  }
  ngOnInit(): void {

    this.userForm = this.fb.group({
      name: [this.userListModal.name, [Validators.required]],
      email: [this.userListModal.email, [Validators.required, Validators.email]],
      role: [this.userListModal.role, [Validators.required]]
    });

    // set data in form using patchValue
    this.userForm.patchValue({
      name: this.data.name,
      role: this.data.role,
      email: this.data.email
    })
  }

  get f() {
    // return ths form Control
    return this.userForm.controls;
  }

  
  updateUser(): void {
    this.submitted =true;
    // Check if form is valid
    if (this.userForm.invalid) {
      this.toaster.error('Please fill out the form correctly');
      return;
    }
  
    //  updated user data is stored in the form
    const updatedUser = this.userForm.value;
  
    // Retrieve users from localStorage (ensure you're using the correct key)
    let users = JSON.parse(localStorage.getItem('user') || '[]');
  
   
    console.log('Users in localStorage:', users);
    console.log('User ID from dialog:', this.data.id);
  
    //for get the index of update user
    const userIndex = users.findIndex((user: any) => user.id == this.data.id);
  
    // Debugging: Check the result of findIndex
    console.log('User index found:', userIndex);
  
    if (userIndex !== -1) {

      updatedUser.id = this.data.id;
  
      // Update the user data at the found index
      users[userIndex] = updatedUser;
  
      localStorage.setItem('user', JSON.stringify(users));
  
      this.dialogRef.close(updatedUser);
      this.toaster.success('User updated successfully');
      window.location.reload();
    } else {
      // If no user is found with the matching id
      this.toaster.error('User not found');
    }
  }
  
  // Method to close the dialog without saving
  onCancel(): void {
    this.dialogRef.close();
  }

}
