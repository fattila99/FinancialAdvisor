import { Component } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogComponent} from '../shared/dialog/dialog.component';
import {monthlyPlan} from '../shared/model/monthlyPlan';
import {MonthlyPlanService} from '../shared/services/monthly-plan.service';

@Component({
  selector: 'app-monthly-plans',
  imports: [],
  templateUrl: './monthly-plans.component.html',
  standalone: true,
  styleUrl: './monthly-plans.component.scss'
})
export class MonthlyPlansComponent {
  monthlyPlans!: monthlyPlan[];
  columns = ['name', 'limit', 'delete'];

  constructor(
    private monthlyPlanService: MonthlyPlanService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.monthlyPlanService.getAllPlans().subscribe({
      next: (data) => {
        this.monthlyPlans = data;
        console.log(this.monthlyPlans);
      }, error: (err) => {
        console.log(err);
      }
    });
  }



  deletePlan(id: string, n: number) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          // user deletion
          console.log(data);
          this.monthlyPlanService.delete(id).subscribe({
            next: (data) => {
              console.log(data);
              this.monthlyPlans?.splice(n, 1);
              this.monthlyPlans = [...this.monthlyPlans];
              this.openSnackBar('Plan deleted successfully.', 3000);
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

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, undefined, { duration: duration });
  }
}
