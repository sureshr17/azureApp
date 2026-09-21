import { Component, inject } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { InteractionStatus } from '@azure/msal-browser';
import { filter, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
  <input type="text" placeholder="Username" [(ngModel)]="username" />,<br>
    <button (click)="login()">Login</button>
  `
})
export class LoginComponent {
  username: string = '';
  private msalService = inject(MsalService);
  private http = inject(HttpClient);
  private msalBroadcastService = inject(MsalBroadcastService);
  private router = inject(Router);

  login() {
    const accounts = this.msalService.instance.getAllAccounts();
    console.log(accounts);

    if (accounts.length >= 0) {
      this.msalService.instance.setActiveAccount(accounts[0]);
      
      this.router.navigate(['/dashboard']);
      return;
    }

    const loginRequest = {
      scopes: ['openid', 'profile', 'User.Read'],
      loginHint: this.username
    };

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status) => status === InteractionStatus.None),
        take(1)
      )
      .subscribe(() => {
        this.msalService.loginRedirect(loginRequest);
      });
  }
}