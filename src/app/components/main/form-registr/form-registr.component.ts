import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form-registr',
  templateUrl: './form-registr.component.html',
  styleUrls: ['./form-registr.component.scss']
})
export class FormRegistrComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit() {
    this.form.disable();

    this.auth.register(this.form.value).subscribe(
      () => {

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
      },
      err => {
        console.warn(err);
        this.form.enable();
      }
    );
  }

}
