import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-big-menu',
  templateUrl: './big-menu.component.html',
  styleUrls: ['./big-menu.component.scss']
})
export class BigMenuComponent implements OnInit {

  isAuthenticated: boolean = this.auth.isAuthenticated();

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  OnClick() {
    this.auth.logout();
    this.router.navigate(['/ticekt']);
  }
}
