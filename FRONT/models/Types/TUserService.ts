export type TGetUserListByRoleIdResponse = {
    id: string
    fullName: string,
    email: string,
    roleId: number,
    roleName: string
}

export type TGetUserResponse = {
    id: string
    fullName: string,
    email: string,
    roleId: number,
    roleName: string
}

export type TLoginResponse = {
    email: string,
    mainPassword: string
}

export type TCreateUserResponse = {
    userId?: string
    fullName: string,
    email: string,
    roleId: number,
    mainPassword: string
}

export type TEditUserResponse = {   
    userId: string,
    userLoggedId?: string,
    fullName: string,   
    roleId: number    
}
