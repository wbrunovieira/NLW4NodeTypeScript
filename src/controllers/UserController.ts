import { AppError } from './../errors/AppError';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UserRepositories';
import * as yup from 'yup';

class UserController {

    async create(request: Request, response: Response) {
        const { name, email} = request.body;

        const schema = yup.object().shape({
            name: yup.string().required("Nome Obrigatorio"),
            email: yup.string().email().required("email incorreto")
        });

        // if(!(await schema.isValid(request.body))) {
        //     return response.status(400).json({error: "Validation Failed"})
        // }

        try{
            await schema.validate(request.body, { abortEarly: false});
        } catch (err) {
            throw new AppError(err);
        }
        
        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email
        })
        if(userAlreadyExists){
            throw new AppError("User already exists!");
        }
        const user = usersRepository.create({
            name, email
        })

        await usersRepository.save(user);

        return response.status(201).json(user);
    }
}

export { UserController };
