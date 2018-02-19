export class AuthService {

  private isAuthenticated = false;

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
    window.localStorage.clear(); // обьект типа куки для хранения информации
  }
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

}
