import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { monthlyPlan } from '../model/monthlyPlan';

@Injectable({
  providedIn: 'root'
})
export class MonthlyPlanService {

  constructor(private http: HttpClient) { }

  getAllPlans(userId: string) {

    const body = new URLSearchParams();
    body.set('userId', userId);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/getUserMonthlyPlans', body, {withCredentials: true, headers: headers});
  }

  getPlanById(id: string) {
    return this.http.get('http://localhost:5000/app/getMonthlyPlanById?id=' + id, {withCredentials: true});
  }

  addPlan(plan: monthlyPlan, userId: string) {
    const body = new URLSearchParams();
    body.set('monthName', plan.monthName);
    body.set('limit', plan.limit.toString());
    body.set('userId', userId);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/addMonthlyPlan', body, {withCredentials: true, headers: headers});
  }

  updatePlan(plan: any) {

    const body = new URLSearchParams();
    body.set('id', plan._id);
    body.set('monthName', plan.monthName);
    body.set('limit', plan.limit.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.put('http://localhost:5000/app/updateMonthlyPlan', body, {withCredentials: true, headers: headers});
  }

  delete(id: string) {
    return this.http.delete('http://localhost:5000/app/deleteMonthlyPlan?id=' + id, {withCredentials: true});
  }

}
