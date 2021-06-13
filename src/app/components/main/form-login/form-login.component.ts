import { Component, OnInit } from '@angular/core';
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
  queryParams: Params = this.route.snapshot.queryParams;

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
        let nextPage = this.route.snapshot.queryParams['nextPage'];

        if (nextPage) {
          let [ url, params ] = nextPage.split('?');
          let objParams = {}

          params.split('&').map((element: string) => {
            let [key, value] = element.split('=');

            Object.assign(objParams, {[key]: value});
          });

          this.router.navigate([`${url}`], {
            queryParams: {
              ...objParams
            }
          });
        } else {
          this.router.navigate(['/orders']);
        }
      },
      err => {
        console.warn(err);
        this.form.enable();
      }
    );
  }

}
