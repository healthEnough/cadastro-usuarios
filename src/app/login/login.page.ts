import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formLogin: FormGroup

  public mensagens_validacao = {
    email: [
    {
      tipo: 'required',
      mensagem: 'O campo Email é obrigatório...'
    },
    {
      tipo: 'email', mensagem: 'Email inválido'
    }
    ],
    senha: [
      {
        tipo: 'required',
        mensagem: 'O campo senha é obrigatório...'
      },
      {
        tipo: 'minLegth', mensagem: 'A senha deve ter no mínimo 6 caracteres...'
      }
    ]
  }

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) 
  { 
    this.formLogin=fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }

  ngOnInit() {
  }

  public login() {
    if(this.formLogin.valid) {
      console.log('Formulário Válido')
      this.router.navigateByUrl('/home')
    } else {
      console.log('Formulário Inválido')
      
    }

  }

}
