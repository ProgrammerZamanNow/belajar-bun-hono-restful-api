import {prismaClient} from "../src/application/database";
import {Contact} from "@prisma/client";

export class UserTest {

    static async create() {
        await prismaClient.user.create({
            data: {
                username: "test",
                name: "test",
                password: await Bun.password.hash("test", {
                    algorithm: "bcrypt",
                    cost: 10
                }),
                token: "test"
            }
        })
    }

    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                username: "test"
            }
        })
    }

}

export class ContactTest {

    static async deleteAll() {
        await prismaClient.contact.deleteMany({
            where: {
                username: 'test'
            }
        })
    }

    static async create() {
        await prismaClient.contact.create({
            data: {
                first_name: "Test",
                last_name: "Test",
                email: "test@gmail.com",
                phone: "123123",
                username: "test"
            }
        })
    }

    static async get(): Promise<Contact> {
        return prismaClient.contact.findFirstOrThrow({
            where: {
                username: "test"
            }
        })
    }

}
