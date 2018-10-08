import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeUntil';

import { PublicacoesService } from '../../services/publicacoes.service';
import { ProgressoService } from './../../services/progresso.service';

@Component({
  selector: 'app-nova-publicacao',
  templateUrl: './nova-publicacao.component.html',
  styleUrls: ['./nova-publicacao.component.css']
})
export class NovaPublicacaoComponent implements OnInit {

  constructor(private publicacoesService: PublicacoesService, private progresso: ProgressoService) { }

  @Output() public atualizarTimeline: EventEmitter<any> = new EventEmitter<any>();

  public email: string;
  private imagem: any;

  public progressoPublicacao: string = 'pendente';
  public porcentagemUpload: number;

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  });

  ngOnInit() {
    firebase.auth().onAuthStateChanged( user => {
      this.email = user.email;
    });

  }

  public publicar(): void {
    this.publicacoesService.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem
    });

    const acompanhamentoUpload = Observable.interval(1500);
    const continua = new Subject();

    continua.next(true);

    acompanhamentoUpload
      .takeUntil(continua)
      .subscribe((x) => {
        this.progressoPublicacao = 'andamento';

        this.porcentagemUpload = Math.ceil((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100);

        if (this.progresso.status === 'concluido') {
          continua.next(false);
          this.progressoPublicacao = 'concluido';
          this.atualizarTimeline.emit('atualizar');
        }
    });

  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files[0];
  }

}
