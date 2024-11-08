import {Hono} from "hono";
import {ApplicationVariables} from "../model/app-model";
import {authMiddleware} from "../middleware/auth-middleware";
import {User} from "@prisma/client";
import {
    CreateAddressRequest,
    GetAddressRequest, ListAddressRequest,
    RemoveAddressRequest,
    UpdateAddressRequest
} from "../model/address-model";
import {AddressService} from "../service/address-service";

export const addressController = new Hono<{ Variables: ApplicationVariables }>();
addressController.use(authMiddleware)

addressController.post('/api/contacts/:id/addresses', async (c) => {
    const user = c.get('user') as User
    const contactId = Number(c.req.param("id"))
    const request = await c.req.json() as CreateAddressRequest
    request.contact_id = contactId
    const response = await AddressService.create(user, request)
    return c.json({
        data: response
    })
})

addressController.get('/api/contacts/:contact_id/addresses/:address_id', async (c) => {
    const user = c.get('user') as User
    const request: GetAddressRequest = {
        contact_id: Number(c.req.param("contact_id")),
        id: Number(c.req.param("address_id"))
    }
    const response = await AddressService.get(user, request)
    return c.json({
        data: response
    })
})

addressController.put('/api/contacts/:contact_id/addresses/:address_id', async (c) => {
    const user = c.get('user') as User
    const contactId = Number(c.req.param("contact_id"))
    const addressId = Number(c.req.param("address_id"))
    const request = await c.req.json() as UpdateAddressRequest
    request.contact_id = contactId
    request.id = addressId
    const response = await AddressService.update(user, request)
    return c.json({
        data: response
    })
})

addressController.delete('/api/contacts/:contact_id/addresses/:address_id', async (c) => {
    const user = c.get('user') as User
    const request: RemoveAddressRequest = {
        id: Number(c.req.param("address_id")),
        contact_id: Number(c.req.param("contact_id"))
    }
    const response = await AddressService.remove(user, request)
    return c.json({
        data: response
    })
})

addressController.get('/api/contacts/:contact_id/addresses', async (c) => {
    const user = c.get('user') as User
    const request: ListAddressRequest = {
        contact_id: Number(c.req.param("contact_id"))
    }
    const response = await AddressService.list(user, request)
    return c.json({
        data: response
    })
})
