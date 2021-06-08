import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
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
        console.log('Register success');
        this.router.navigate(['/login'], {
          queryParams: {
            registred: true
          }
        });
      },
      err => {
        console.warn(err);
        this.form.enable();
      }
    );
  }

}
