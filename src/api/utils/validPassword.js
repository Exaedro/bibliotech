import { compare } from "bcrypt";

export const validPassword = async ({ password, hash }) => {
    const isPasswordValid = await compare(password, hash)

    if(!isPasswordValid)
        return false

    return true
}