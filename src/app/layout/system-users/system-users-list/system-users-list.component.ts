import { Component, OnInit } from '@angular/core';
import { SystemUsers } from '../../../shared/models/system-users.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemUsersService } from '../../../shared/services/system-users.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../../../router.animations';


@Component({
  selector: 'app-system-users-list',
  templateUrl: './system-users-list.component.html',
  styleUrls: ['./system-users-list.component.scss'],
  animations: [routerTransition()]
})
export class SystemUsersListComponent implements OnInit {


  teste(str){
    console.log(str)
  }
  public apiUser: SystemUsers[];
  public countApiUser: number = 0;
  public token: string = localStorage.getItem('token');
  public closeResult: string;
  public contentVisu: string;
  // BRASILIANO
  public quantPorPage: number = 2;
  public listaDePaginacao: any = [];
  public numeroDaPagina: number;
  public totalDeUsuarios: number;
  public visualization: boolean = false;
  public idVisualization: string;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private modalService: NgbModal,
    private systemUsersService: SystemUsersService,

  ) { }


  ngOnInit() {
    this.main(1);
  }

  closeVisualization(): void {
    console.log('clickou')
  }
  setValue(value): string {

    if (value == null) {
      return '';
    } else {
      return value;
    }
  }


  public paginar(pagina: number, $event: any) {

    $event.preventDefault();
    this.main(pagina);
  }


  public main(pagina: number): void {

    this.systemUsersService.countUser(this.token)
      .subscribe((apiResponse: number) => {

        this.totalDeUsuarios = apiResponse;

        this.numeroDaPagina = pagina;
        this.carregarListaDePaginas();
        this.listUsers(this.quantPorPage, this.numeroDaPagina);
      });
  }


  public listUsers(limit, pagina): void {

    let skip = ((pagina - 1) * this.quantPorPage);
    const obj = [limit, skip];

    this.systemUsersService.listUsers(this.token, obj)
      .subscribe((apiResponse: SystemUsers[]) => {
        this.apiUser = this.percorrer(apiResponse);
      });
  }

  public addNewUser(): void {
    this.router.navigateByUrl('/system-users/newSystemUser'); //ROTEAMENTO
  }

  public carregarListaDePaginas(): any {

    this.listaDePaginacao = [];
    let tamanhoDoArray = this.totalDeUsuarios / this.quantPorPage;
    let restoTamanhoDoArray = this.totalDeUsuarios % this.quantPorPage;

    if (restoTamanhoDoArray !== 0) {
      tamanhoDoArray = Math.ceil(tamanhoDoArray);
    }

    for (let i = 1; i <= tamanhoDoArray; i++) {
      this.listaDePaginacao.push(i);
    }
  }


  public percorrer(apiResponse): any {

    for (const elemento in apiResponse) {
      apiResponse = apiResponse[elemento];
    }

    return apiResponse;
  }


  public editUsers(userE: SystemUsers) {
    this.router.navigate(['/system-users/systemUsersEdit'], { queryParams: { id: userE._id } });
  }


  public deleteUser(user: SystemUsers): void {

    this.systemUsersService.deleteUser(user._id, this.token)
      .subscribe((apiResponse: SystemUsers) => {

        for (let i = 0; i < this.apiUser.length; i++) {
          this.countApiUser += 1;
        }

        if ((this.apiUser[0]._id === user._id) && (this.countApiUser === 1)) {
          this.main(this.numeroDaPagina - 1);
        } else {
          this.main(this.numeroDaPagina);
        }

      },
      (error: any) => {
        console.log(error);
        if (error._body === '{"errors":["Não foi possível deletar o usuário."]}') { }
      }
      );
  }

  openDelete(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  public quantPorPagina(value: number): any {
    console.log('quantidade por pag')
    console.log(value);
    if (value > this.totalDeUsuarios) {
      alert(" No banco não existe essa quantidade de usuarios cadastrados. \n A quantidade que será apresentada é o valor maximo cadastrado.");
      this.quantPorPage = this.totalDeUsuarios;
      this.main(1);
    }
    else if (value === 0) {
      this.quantPorPage = this.totalDeUsuarios;
      this.main(1);
    }
    else {
      this.quantPorPage = value;
      this.main(1);
    }
  }


  visualizationM(user): void {
    console.log(user)
    this.visualization = !this.visualization;
    this.idVisualization = user._id;
  }

  onClose(evento): void {
    console.log('click')
    this.visualization = !this.visualization;
  }


}
