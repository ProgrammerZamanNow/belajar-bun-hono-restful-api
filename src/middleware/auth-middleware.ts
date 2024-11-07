import {MiddlewareHandler} from "hono";
import {UserService} from "../service/user-service";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
    const token = c.req.header('Authorization')
    const user = await UserService.get(token)

    c.set('user', user)

    await next()
}
