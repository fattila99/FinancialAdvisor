import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanItemService {

  constructor(private http: HttpClient) { }

  addItem(item: any) {

    const body = new URLSearchParams();
    body.set('name', item.name);
    body.set('amount', item.amount.toString());
    body.set('monthlyPlan', item.monthlyPlan);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/addPlanItem', body, {withCredentials: true, headers: headers});
  }

  deleteItem(itemId: string) {
    return this.http.delete('http://localhost:5000/app/deletePlanItem?id=' + itemId, {withCredentials: true});
  }

  getItemsForPlan(planId: string) {
    // getItemsByMonthlyPlan
    const body = new URLSearchParams();
    body.set('monthlyPlan', planId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/getItemsByMonthlyPlan', body, {withCredentials: true, headers: headers});
  }

}
