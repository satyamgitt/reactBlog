import { Account, Client, ID } from "appwrite"
import conf from "../conf/conf";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectid)

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                loing(email, password)
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }

    }

    async loing({ email, password }) {
        const userLogin = await this.client.createEmailPasswordSession(email, password)
        return userLogin;

    }

    async getUserAccount() {
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