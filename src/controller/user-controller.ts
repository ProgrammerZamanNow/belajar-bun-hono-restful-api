import {Hono} from "hono";
import {LoginUserRequest, RegisterUserRequest, toUserResponse} from "../model/user-model";
import {UserService} from "../service/user-service";
import {ApplicationVariables} from "../model/app-model";
import {User} from "@prisma/client";

export const userController = new Hono<{ Variables: ApplicationVariables }>();

userController.post('/api/users', async (c) => {
    const request = await c.req.json() as RegisterUserRequest;

    const response = await UserService.register(request)

    return c.json({
        data: response
    })
})

userController.post('/api/users/login', async (c) => {
    const request = await c.req.json() as LoginUserRequest;

    const response = await UserService.login(request)

    return c.json({
        data: response
    })
})

userController.use(async (c, next) => {
    const token = c.req.header('Authorization')
    const user = await UserService.get(token)

    c.set('user', user)

    await next()
})

userController.get('/api/users/current', async (c) => {
    const user = c.get('user') as User

    return c.json({
        data: toUserResponse(user)
    })
})
