
//Função para buscar iniciais do nome para tela de perfil
export function getInitials(fullName: string) {
    if (fullName) {
      const names = fullName.split(" ");
      if (names.length >= 2) {
        const firstName = names[0];
        const lastName = names[names.length - 1];
        return `${firstName.charAt(0)}${lastName.charAt(0)}`;
      } else if (names.length === 1) {
        return names[0].charAt(0);
      }
    }
    return "";
  }