import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface LoginRequest{
    email: string;
    password: string;
}

class LoginUserService{
    async execute({ email, password }: LoginRequest){
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            },
            include: {
                subscription: true
            }
        })

        if(!user){
            throw new Error("Usuário não existe")
        }

        const passwordMatch = await compare(password, user?.password)

        if(!passwordMatch){
            throw new Error("E-mail, ou senha incorreto(s)!")
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET as string,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            token: token,
            subscription: user.subscription && {
                id: user?.subscription.id,
                status: user?.subscription.status
            }
        }
    }
}

export { LoginUserService }