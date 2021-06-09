import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  form!: FormGroup;
  aSub!: Subscription;

  constructor(
      private auth: AuthService,
      private router: Router,
      private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        // messageBox: You can log in to the system using youself data
      } else if (params['accessDenied']) {
        // messageBox: First, log in to the system
      } else if (params['sessionExpired']) {
        // messageBox: Please login again
      }
    });
  }

  onSubmit() {
    this.form.disable();

    this.auth.login(this.form.value).subscribe(
      () => {
        console.log('Login success');
      },
      err => {
        console.warn(err);
        this.form.enable();
      }
    );
  }

}
