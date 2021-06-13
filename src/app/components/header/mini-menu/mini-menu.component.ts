import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mini-menu',
  templateUrl: './mini-menu.component.html',
  styleUrls: ['./mini-menu.component.scss']
})
export class MiniMenuComponent implements OnInit {

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
