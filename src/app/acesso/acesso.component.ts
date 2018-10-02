import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
          style({ opacity: 0, transform: 'translateX(-50px)'}),
          animate('500ms 200ms ease-in-out')
      ])
    ]),
    trigger('animacao-login', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
          style({ opacity: 0, transform: 'translate(30px, -30px)'}),
          animate('1500ms 200ms ease-in-out', keyframes([
            // style({offset: 0, transform: 'translateY(-50px)'}),
            style({offset: 0.1, opacity: 1, transform: 'translateY(30px)'}),
            // style({offset: 0.7, opacity: 1, transform: 'translateY(5px)'}),
            // style({offset: 0.9, opacity: 1, transform: 'translateY(-5px)'}),
            style({offset: 1, opacity: 1, transform: 'translate(0, 0)'}),
          ]))
      ]),
      state('erro', style({
        transform: 'translateY(0px)'
      })),
      transition('criado => erro', [
        animate('1s ease', keyframes([
          style({offset: 0.4, transform: 'translateY(-5px)'}),
          style({offset: 0.55, transform: 'translateY(10px)'}),
          style({offset: 0.6, transform: 'translateY(-10px)'}),
        ]))
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoAnimacao: string = 'criado';
  public exibeCadastro: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public exibePainel(event: string): void {
    this.exibeCadastro = event === 'cadastro' ? true : false;
  }

  public treme(event: string): void {
    this.estadoAnimacao = 'erro';
  }

  public mudaState(): void {
    console.log('fim');
    this.estadoAnimacao = 'criado';
  }

}
