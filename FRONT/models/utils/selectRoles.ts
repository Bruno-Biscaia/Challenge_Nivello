import { TGetRolesResponse } from '../Types/TRoleService';

// Função para exibir a lista apenas com roles menores do que o usuário possui
export function filterRolesByRoleId(roleId: number, rolesList: TGetRolesResponse[]) {
  const rolesFiltrados = rolesList.filter((x) => x.id !== roleId && x.id < roleId);
  return rolesFiltrados;
}
