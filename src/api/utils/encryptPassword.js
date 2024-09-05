import { hash } from "bcrypt";

export const encryptPassword = async ({ password }) => {
    const hashedPassword = await hash(password, 10)
    return hashedPassword
}