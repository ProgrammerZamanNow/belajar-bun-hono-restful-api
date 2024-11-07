import {User} from "@prisma/client";
import {ContactResponse, CreateContactRequest, toContactResponse} from "../model/contact-model";
import {ContactValidation} from "../validation/contact-validation";
import {prismaClient} from "../application/database";

export class ContactService {

    static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
        request = ContactValidation.CREATE.parse(request)

        let data = {
            ...request,
            ...{username: user.username}
        }

        const contact = await prismaClient.contact.create({
            data: data
        })

        return toContactResponse(contact)
    }

}
