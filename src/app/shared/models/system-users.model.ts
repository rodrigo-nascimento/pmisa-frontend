import { UsersAddress} from './system-users-address'
import {UsersPhone} from './system-users-phone'
import { UsersDocuments} from './system-users-documents'

export class SystemUsers {  
    public _id: string;
    public length : number;

    constructor(
      
        public name: string,
        public email: string,
        public login: string,
        public password: string,
        public lats_login: string,
        public documents: Array<UsersDocuments>,
        public address: Array<UsersAddress>,
        public phone: Array<UsersPhone>
    ) { }
}
