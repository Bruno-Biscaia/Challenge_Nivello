
//Função para validação de email
export function validateEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

//Função para validação do Nome
export function validateFullName(fullName: string) {
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
  return regex.test(fullName);
}

//Função para validação de senha
export function validatePassword(password: string) {
  const regex = /^\d{1,6}$/;
  return regex.test(password);
}

