import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public formRegistro: FormGroup

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
    ],
    confirmarsenha: [
      {
        tipo: 'required',
        mensagem: 'O campo de confirmação é obrigatório...'
      },
      {
        tipo: 'minLegth', mensagem: 'A confirmação deve ter no mínimo 6 caracteres...'
      }
    ],
    nome: [
      {
        tipo: 'required',
        mensagem: 'O campo de Nome é obrigatório...'
      },
      {
        tipo: 'minLegth', mensagem: 'O nome deve ter no mínimo 13 caracteres...'
      }
    ],
    cpf: [
      {
        tipo: 'required',
        mensagem: 'O campo de CPF é obrigatório...'
      },
      {
        tipo: 'minLegth', mensagem: 'O CPF deve ter no mínimo 11 caracteres...',
        tipoo: 'maxLegth', mensagemm: 'O CPF deve ter no máximo 14 caracteres...'
      }
    ],
    datadenascimento: [
      {
        tipo: 'required',
        mensagem: 'O campo de data de Nascimento é obrigatório...'
      },
      {
        tipo: 'datadenascimento', mensagem: 'Data de Nascimento Inválida...'
      }
    ],
    sexo: [
      {
        tipo: 'required',
        mensagem: 'O campo de Sexo é obrigatório...'
      },
      {
        tipo: 'sexo', mensagem: 'Sexo Inválida...'
      }
    ],
    celular: [
      {
        tipo: 'required',
        mensagem: 'O campo de Celular é obrigatório...'
      },
      {
        tipo: 'maxLegth', mensagem: 'O Celular deve ter no máximo 14 caracteres...'
      }
    ],
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private us: UsuariosService,
    public ac: AlertController
  ) 
  { 
    this.formRegistro=fb.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(14)])],
      datadenascimento: ['', Validators.compose([Validators.required])],
      sexo: ['', Validators.compose([Validators.required])],
      celular: ['', Validators.compose([Validators.required, Validators.maxLength(16)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmarsenha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }


  async ngOnInit() {
    await this.us.buscarTodos()
    console.log(this.us.listadeusuarios)
  }

  public async salvarForm(){
    if(this.formRegistro.valid){
      let usuario=new Usuario()
        usuario.nome=this.formRegistro.value.nome
        usuario.cpf=this.formRegistro.value.cpf
        usuario.dataDeNascimento=new Date(this.formRegistro.value.dataDeNascimento)
        usuario.genero=this.formRegistro.value.genero
        usuario.celular=this.formRegistro.value.celular
        usuario.email=this.formRegistro.value.email
        usuario.senha=this.formRegistro.value.senha
        if(await this.us.salvar(usuario)){
          this.presentAlert('Sucesso','Usuário salvo com sucesso')
          this.router.navigateByUrl('/login')
        }else{
          this.presentAlert('Erro','Erro ao salvar o usuário')
        }
      
    }else{
      this.presentAlert('Advertência','Formulário inválido<b4>Verifique os campos do seu formulário')
    }
  }

  async presentAlert(title:string,message:string){
    const alert=await this.ac.create({
      header: title,
      message: message,
      buttons: ['OK']
    }) 
    await alert.present()
  }

  public login() {
    if(this.formRegistro.valid) {
      console.log('Formulário Válido')
      this.router.navigateByUrl('/home')
    } else {
      console.log('Formulário Inválido')
    }
  }

}
