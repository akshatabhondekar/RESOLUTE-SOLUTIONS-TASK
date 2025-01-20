import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { userListModal } from '../../modal/userListModal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  USER_DATA: userListModal[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'action'];
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<userListModal>(this.USER_DATA);

  userListModal: Array<userListModal> = new Array<userListModal>();
  searchString: string = ''

  constructor(private router: Router, private dialog: MatDialog, private toaster: ToastrService){}

  ngOnInit(): void {
    // get users list from localstorage
   const users: userListModal[] = JSON.parse(localStorage.getItem('user') || '[]');
debugger
this.dataSource = new MatTableDataSource<userListModal>(users);

 // Initialize the data source with users
 this.dataSource.data = users;

    this.dataSource.filterPredicate = (data: userListModal, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      return (
        data.name.toLowerCase().includes(transformedFilter) ||
        data.email.toLowerCase().includes(transformedFilter)
      );
    };
  }

  ngAfterViewInit(): void {
  
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort;
  }

  goToAddUser() {
    this.router.navigate(['add']);
  }

  openDeleteDialog(user:any) {
    debugger
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: { user },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    
    });
  }

  openEditDialog(user: any): void {

    const dialogRef = this.dialog.open(EditUserComponent, {
      data: user,
      width: '50%',
      maxWidth: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
    
      }
    });
  }

  SearchByName() {
    debugger
    const users: userListModal[] = JSON.parse(localStorage.getItem('user') || '[]');
    debugger
    let searchItem: userListModal[] = users.filter(ob => 
      ob.name.includes(this.searchString) || ob.email.includes(this.searchString)
    );
  
    this.dataSource = new MatTableDataSource<userListModal>(searchItem);
  }
  
}
