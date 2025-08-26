import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Pay Mom</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item lines="none">
        <ion-label position="stacked">Amount (₹)</ion-label>
        <ion-input type="number" [(ngModel)]="amount" placeholder="100"></ion-input>
      </ion-item>

      <ion-button expand="block" (click)="payMom()">Send money to Mom</ion-button>
    </ion-content>
  `,
  providers: [InAppBrowser] // provide plugin here in standalone mode
})
export class HomePage {
  // EDIT THESE:
  upiId = '8008203112@axl';         // <-- put your mom’s actual UPI ID
  name  = 'Mom';             // display name
  note  = 'For groceries';   // transaction note
  amount: any = 1;         // default amount

  constructor(private iab: InAppBrowser) {}

  payMom() {
    const pa = encodeURIComponent(this.upiId);
    const pn = encodeURIComponent(this.name);
    const am = encodeURIComponent(String(this.amount || ''));
    const tn = encodeURIComponent(this.note);
    const cu = 'INR';

    const upiUrl = `upi://pay?pa=${pa}&pn=${pn}&am=${am}&tn=${tn}&cu=${cu}`;
    this.iab.create(upiUrl, '_system');
  }
}
