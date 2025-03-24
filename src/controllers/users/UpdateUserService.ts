import prismaClient from "../../prisma";

interface UpdateRequest{
    user_id: string;
    name: string;
    address: string;
}

class UpdateUserService{
    async execute({user_id, name, address}: UpdateRequest){

        try{
            const userExists = await prismaClient.user.findFirst({
                where: {
                    id: user_id
                }
            })

            if(!userExists){
                throw new Error("Usuário não encontrado")
            }

            const updatedUser = await prismaClient.user.update({
                where: {
                    id: user_id
                },
                data: {
                    name: name,
                    address: address
                },
                select: {
                    name: true,
                    email: true,
                    address: true
                }
            })

            return updatedUser;
            
        } catch(err){
            console.log(err);
            throw new Error("Erro ao atualizar usuário")
        }

    }
}

export { UpdateUserService }