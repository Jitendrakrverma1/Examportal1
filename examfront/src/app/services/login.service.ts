import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  // current user which is loggedin
  public getCurrentUser()
  {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken(userloginData:any)
  {
    return this.http.post(`${baseUrl}/generate-token`,userloginData);
  }

  //login user: set token in localstorage
  public loginUser(token:string)   // check here pls 'string' if error occur
  {
    localStorage.setItem('token',token);
    this.loginStatusSubject.next(true);
    return true;
  }

  // islogin: user is logged in or not
  public isLoggedIn()
  {
    let tokenStr = localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null)
    {
      return false;
    }else{
      return true;
    }
  }

  //Logout: remove token from local storage
  public logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //get token
  public getToken()
  {
    return localStorage.getItem('token');
  }

  //set userDetails
  public setUser(user: any)   //pls check here 'any' if error occur
  {
    localStorage.setItem('user',JSON.stringify(user));
  }

  //getUser
  public getUser()
  {
    let userStr=localStorage.getItem('user');
    if(userStr!=null)
    {
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  //get user role
    public getUserRole()
    {
      let user = this.getUser();
      return user.authorities[0].authority;
    }
}



