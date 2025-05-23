import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../shared/model/user';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule,  MatDialogModule, MatSnackBarModule, MatCheckboxModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
  users!: User[];
  columns = ['email', 'name', 'address', 'isAdvisor', 'delete', 'sendMessage'];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log(this.users);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  updateUser(id: string, isAdvisor: boolean) {
    this.userService.changeIsAdvisor(id, isAdvisor).subscribe({
      next: (data) => {
        console.log(data);
        this.users = this.users.map((user) => {
          if (user._id === id) {
            user.isAdvisor = !user.isAdvisor;
          }
          return user;
        });
        this.openSnackBar('User updated successfully.', 3000);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        localStorage.clear();
        this.router.navigateByUrl('/login');
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  deleteUser(id: string, n: number) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          // user deletion
          console.log(data);
          this.userService.delete(id).subscribe({
            next: (data) => {
              console.log(data);
              this.users?.splice(n, 1);
              this.users = [...this.users];
              this.openSnackBar('User deleted successfully.', 3000);
            }, error: (err) => {
              console.log(err);
            }
          });
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  sendMessage(receiverId: string) {
    const message = 'Please contact me for more information.';

    const senderEmail = this.authService.getCurrentUser().email;

    this.userService.sendMessage(receiverId, senderEmail, message).subscribe({
      next: (data) => {
        console.log(data);
        this.openSnackBar('Message sent successfully.', 3000);
      }, error: (err) => {
        console.log(err);
      }
    });

  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, undefined, { duration: duration });
  }
}
