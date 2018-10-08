import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { ProgressoService } from './progresso.service';

@Injectable()
export class PublicacoesService {
  constructor(private progresso: ProgressoService) {}

  public publicar(publicacao: any): void {
    firebase
      .database()
      .ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
      .then(resposta => {
        const nomeImagem = resposta.key;

        firebase
          .storage()
          .ref()
          .child(`imagens/${nomeImagem}`)
          .put(publicacao.imagem)
          .on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
              this.progresso.status = 'andamento';
              this.progresso.estado = snapshot;
            },
            error => {
              this.progresso.status = 'erro';
            },
            (/*finish*/) => {
              this.progresso.status = 'concluido';
              console.log('feito');
            }
          );
      });
  }

  public consultaPublicacoes(email: string): Promise<any> {
    return new Promise((resolve) => {
      firebase
        .database()
        .ref(`publicacoes/${btoa(email)}`)
        // .orderByKey()
        .once('value')
        .then(snapshot => {
          const publicacoes = [];

          snapshot.forEach(childSnapshot => {
            const publicacao = childSnapshot.val();

            publicacao.key = childSnapshot.key;
            publicacoes.push(publicacao);
          });
          return publicacoes.reverse();
        })
        .then(publicacoes => {

          publicacoes.forEach( publicacao => {
            // consultar a URL da imagem
              firebase.storage().ref()
                .child(`imagens/${publicacao.key}`)
                  .getDownloadURL().then((url: string) => {
                    publicacao.urlImagem = url;

                    // consultar nome do usuário
                    firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
                      .once('value').then( snap => {

                        publicacao.nomeUsuario = snap.val().nomeUsuario;
                      });
                  });
          });
          resolve(publicacoes);
        });
    });
  }
}
