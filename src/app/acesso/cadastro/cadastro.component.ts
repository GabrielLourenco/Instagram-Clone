import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Usuario } from '../../models/usuario.model';

import { Auth } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public exibePainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome_usuario': new FormControl(null),
    'senha': new FormControl(null),
  });

  constructor(
    private auth: Auth
  ) { }

  ngOnInit() {
  }

  public exibeLogin(): void {
    this.exibePainel.emit('login');
  }

  public cadastrarUsuario(): void {
    const usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_completo,
      this.formulario.value.senha
    );
    this.auth.cadastrarUsuario(usuario)
      .then(() => this.exibeLogin);

  }

}
