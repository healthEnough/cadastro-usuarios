import { Injectable } from '@angular/core';
import { ArmazenamentoService } from './armazenamento.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public listadeusuarios=[]

  constructor(
    private as: ArmazenamentoService
  ) { }

  public async buscarTodos(){
    this.listadeusuarios=await this.as.pegarDados('usuario')
    if(!this.listadeusuarios){
      this.listadeusuarios=[]
    }
  }
  public async salvar(usuario:Usuario){
    await this.buscarTodos()
    if(!usuario){
      return false
    }
    if(!this.listadeusuarios){
      this.listadeusuarios=[]
    }
    this.listadeusuarios.push(usuario)
    return await this.as.salvarDados('usuario',this.listadeusuarios)
  }
}
