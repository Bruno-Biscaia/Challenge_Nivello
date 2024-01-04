import { deleteAllCookies } from './cookies';

//Função para logout
export function logout() {
    localStorage.clear();
    sessionStorage.clear();
    deleteAllCookies();
    window.location.reload();
    window.location.href = "/login";
  }