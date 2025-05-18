import { Component } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {DialogComponent} from '../shared/dialog/dialog.component';
import {monthlyPlan} from '../shared/model/monthlyPlan';
import {PlanItem} from '../shared/model/planItem';
import {MonthlyPlanService} from '../shared/services/monthly-plan.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'; 
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PlanItemService } from '../shared/services/plan-item.service';
import { UserService } from '../shared/services/user.service';


@Component({
  selector: 'app-monthly-plans',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, CommonModule, MatTableModule, MatIconModule,  MatDialogModule, MatSnackBarModule, MatButtonModule],
  templateUrl: './monthly-plans.component.html',
  standalone: true,
  styleUrl: './monthly-plans.component.scss'
})
export class MonthlyPlansComponent {
  selectedPlan: monthlyPlan | undefined;
  monthlyPlans!: monthlyPlan[];
  columns = ['monthName', 'limit', 'delete', 'select'];
  newPlan: monthlyPlan = {
    monthName: '',
    limit: 0,
  };

  selectedPlanItems: PlanItem[] = [];
  itemColumns: string[] = ['name', 'amount', 'delete'];
  newItem: Partial<PlanItem> = { name: '', amount: 0 };

  totalIncome: number = 0;
  totalSpending: number = 0;
  messages: string[] = [];

  constructor(
    private monthlyPlanService: MonthlyPlanService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private itemService: PlanItemService
  ) { }

  ngOnInit() {
    this.monthlyPlanService.getAllPlans(this.authService.getCurrentUser().id).subscribe({
      next: (data) => {
        console.log(data);
        this.monthlyPlans = data as monthlyPlan[];
        console.log(this.monthlyPlans);
      }, error: (err) => {
        console.log(err);
      }
    });

    this.getMessages();
  }

  addPlan() {
    this.monthlyPlanService.addPlan(this.newPlan, this.authService.getCurrentUser().id).subscribe({
      next: (data) => {
        console.log(data);
        this.monthlyPlans?.push(data as monthlyPlan);
        this.monthlyPlans = [...this.monthlyPlans];
        this.openSnackBar('Plan added successfully.', 3000);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

   selectPlan(planId: string | undefined) {
    if (!planId) {
      this.selectedPlan = undefined;
      return;
    }
    this.selectedPlan = this.monthlyPlans!.find((plan) => plan._id === planId);
    console.log(this.selectedPlan);
    this.loadItemsForPlan(planId);
  }

  updatePlan() {
    if (!this.selectedPlan) {
      return;
    }
    this.monthlyPlanService.updatePlan(this.selectedPlan).subscribe({
      next: (data) => {
        console.log(data);
        const index = this.monthlyPlans?.findIndex((plan) => plan._id === this.selectedPlan?._id);
        if (index !== undefined && index >= 0) {
          this.monthlyPlans![index] = data as monthlyPlan;
          this.monthlyPlans = [...this.monthlyPlans];
          this.openSnackBar('Plan updated successfully.', 3000);
        }
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
          // user deletionm
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

loadItemsForPlan(planId: string) {
  // Replace this mock logic with your real service call
  this.itemService.getItemsForPlan(planId).subscribe((items) => {
    this.selectedPlanItems = items as PlanItem[];
    this.updateTotals();
  });
}

addItem() {
  if (!this.selectedPlan) return;

  const itemToAdd = {
    name: this.newItem.name,
    amount: this.newItem.amount,
    monthlyPlan: this.selectedPlan._id,
  };

  this.itemService.addItem(itemToAdd).subscribe((savedItem) => {
    this.selectedPlanItems = [...this.selectedPlanItems, savedItem as PlanItem];
    this.newItem = { name: '', amount: 0 };
    this.updateTotals();
  });
}

deleteItem(itemId: string) {
  this.itemService.deleteItem(itemId).subscribe(() => {
    this.selectedPlanItems = this.selectedPlanItems.filter(i => i._id !== itemId);
    this.updateTotals();
  });
}

updateTotals() {
  this.totalIncome = this.selectedPlanItems
    .filter(item => item.amount >= 0)
    .reduce((sum, item) => sum + item.amount, 0);

  this.totalSpending = this.selectedPlanItems
    .filter(item => item.amount < 0)
    .reduce((sum, item) => sum + Math.abs(item.amount), 0);
}

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, undefined, { duration: duration });
  }

  getMessages() {
    this.userService.getMessages(this.authService.getCurrentUser().id).subscribe({
      next: (data) => {
        console.log(data);
        this.messages = (data as any[]).map((message: any) => '' + message.text + ' - ' + message.senderEmail);
        console.log(this.messages);
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
}
