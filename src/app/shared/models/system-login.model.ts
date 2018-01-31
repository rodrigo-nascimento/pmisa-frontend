export class  SystemLogin {
    constructor (public name: string,
                 public cpf: string,
                 public email: string,
                 public password: string,
                 public confirm_password: string,
                 public token: string,
                 public active: boolean
    ) { }
}
