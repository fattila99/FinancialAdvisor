import { Component } from '@angular/core';
import {monthlyPlan} from '../shared/model/monthlyPlan';
import {MonthlyPlanService} from '../shared/services/monthly-plan.service';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogComponent} from '../shared/dialog/dialog.component';
import {PlanItem} from '../shared/model/planItem';
import {PlanItemService} from '../shared/services/plan-item.service';

@Component({
  selector: 'app-monthly-items',
  imports: [],
  templateUrl: './monthly-items.component.html',
  standalone: true,
  styleUrl: './monthly-items.component.scss'
})
export class MonthlyItemsComponent {
  items!: PlanItem[];
  columns = ['name', 'amount', 'delete'];

  constructor(
    private planItemService: PlanItemService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.planItemService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
        console.log(this.items);
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
          this.planItemService.delete(id).subscribe({
            next: (data) => {
              console.log(data);
              this.items?.splice(n, 1);
              this.items = [...this.items];
              this.openSnackBar('Item deleted successfully.', 3000);
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
