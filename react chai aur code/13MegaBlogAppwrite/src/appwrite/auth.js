import { use } from "react";
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);

        this.account = new Account(this.client);
    }

    async createAccount(email,password,name) {
        try{ 
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                //call another method
                return this.login(email, password);
            }else{
                return userAccount;
            }
        }catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    async login(email,password){
        try{
            return await this.account.createEmailSession(email, password);
        }catch (error) {
            throw error;
        }
    }

    async getCurrectUser(){
        try{
            return await this.account.get();
        }catch (error) {
            throw error;
        }

        return null; //agar account nahi hai toh null return karenge
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;