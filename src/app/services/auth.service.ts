import { Usuario } from '../models/usuario.model';

import * as firebase from 'firebase';

export class Auth {
  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then( resposta => {

        // remove senha do obj Usuario
        delete usuario.senha;

        // inserindo dados do usuário no path do hash base64 do email do usuario
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set(usuario);
      })
      .catch((erro: Error) => {
        console.log(erro);
      });
  }

  public autenticar(email: string, senha: string): void {
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(resposta => {
        console.log(resposta);
      })
      .catch((erro: Error) => {
        console.log(erro);
      });
  }
}
