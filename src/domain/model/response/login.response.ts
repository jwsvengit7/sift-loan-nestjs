import { Exclude } from "class-transformer";

export class LoginResponse {
    email:string;
    refresh_token:string;
    token:string;
    status:boolean;
    @Exclude(null)
    message:string;


    constructor() {
        this.status = true;
      }
    
      serefresh_token(message: string): this {
        this.refresh_token = message;
        return this;
      }
      setEmail(message: string): this {
        this.email = message;
        return this;
      }
    
      settoken(data: string): this {
        this.token = data;
        return this;
      }
    
      setError(message: string): this {
        this.status = false;
        this.message = message;
        return this;
      }
    
      build(): Responses {
        return {
          token: this.token,
          message: this.message,
          email: this.email,
          refresh_token: this.refresh_token
        };
      }
}

export interface Responses {
    email:string;
    refresh_token:string;
    token:string;
    message:string

  }
  