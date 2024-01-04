import Cookies from 'js-cookie';

//Função para remover cookies
export function deleteAllCookies() {
    const cookies = Cookies.get();  
    for (const cookie in cookies) {
      Cookies.remove(cookie);
    }
  }
