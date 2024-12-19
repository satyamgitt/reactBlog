
import { Client, Account, ID } from "appwrite"
import conf from "../conf/conf";


//  This is a Auth Service means all thing related to authentication will happen from here Even we use our custome Backend or Backend as a service
// here we are using Appwrite so for doing anything in client side appwrite gives one CLIENT code in which we have to set PROJECTIDS and ENDPOINTS so that appwrite should be able to use 

export class AuthService {
    // This Client variable made global in class because when Object of class will get call first it required Client to reach at APPWRITE
    Client = new Client();

    // we have not created account variable globally because after client call twwo more function will get call then only account creation process will start
    account;  

    constructor() {
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectid)
        this.account = new Account(Client)
    }

    async createAccount({ email, name, password }) {
        try {
            const userCreated = await this.account.create(ID.unique(), email, password, name)
            if (userCreated) {
                return this.loging(email, password)
            } else {
                return userCreated
            }
        } catch (error) {
            throw error
        }

    }

    async loging({ email, password }) {
        try {
            const userLogIn = await this.account.createEmailPasswordSession(email, password)
            return userLogIn
        } catch (error) {
            throw error
        }
    }

    async getUser() {
        try {
            return this.account.get()
        } catch (error) {
            throw error
        }

    }

    async logout() {
        try {
            return this.account.deleteSessions()
        } catch (error) {
            throw error
        }

    }
}

const authService = new AuthService()
export default authService