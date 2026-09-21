import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <main>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard.</p>
    </main>
    <footer>
       <button (click)="logout()">Logout</button>
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </footer>
  `
})
export class DashboardComponent {
  private msalService = inject(MsalService);
  constructor() {
    const accounts = this.msalService.instance.getAllAccounts();
    console.log(accounts);

  }

  logout() {
    this.msalService.logoutRedirect();
  }
}
