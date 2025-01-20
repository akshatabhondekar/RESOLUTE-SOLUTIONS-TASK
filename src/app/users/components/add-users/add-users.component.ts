import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userModal } from '../../modal/UsersModal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-users',
  standalone: false,
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  userForm!: FormGroup;
  userModal: userModal = new userModal();
  submitted: boolean = false;
  get f() {
    return this.userForm.controls;
  }
  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router) {
    this.userForm = this.fb.group({
      // UserId: [, Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getStoredUserData();
  }

  addUsers() {
    this.submitted = true;
    // Retrieve existing users from localStorage (note the use of 'users' as the key)
    let users = JSON.parse(localStorage.getItem('user') || '[]');
    debugger
    // Generate a unique ID for the new user
    let newId = this.generateUniqueId(users);
    this.userModal = new userModal();
    // Set the user data
    this.userModal.id = newId;
    this.userModal.name = this.userForm.get('name')?.value;
    this.userModal.email = this.userForm.get('email')?.value;
    this.userModal.role = this.userForm.get('role')?.value;
    console.log(this.userModal);

    // Check if the form is valid
    if (this.userForm.invalid) {
      return;
    }

    // Push the new user into the users array
    users.push(this.userModal);

    // Save the updated users array back to localStorage
    localStorage.setItem('user', JSON.stringify(users));

    // Display success message and navigate
    this.toastr.success('User Added!', 'User Added Successfully!');
    this.router.navigate(['']);
  }

  generateUniqueId(users: any[]): number {
    // Find the highest existing ID (if any)
    let maxId = users.reduce((max, user) => user.id > max ? user.id : max, 0);

    // Increment the ID for the new user
    return maxId + 1;
  }
  getStoredUserData() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userModal = JSON.parse(storedUser);
      console.log('Stored User Data:', this.userModal);
    } else {
      console.log('No user data found in localStorage');
    }
  }

}
