import {prismaClient} from "../src/application/database";
import {Address, Contact} from "@prisma/client";

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
                first_name: "Eko",
                last_name: "Kurniawan",
                email: "test@gmail.com",
                phone: "123123",
                username: "test"
            }
        })
    }

    static async createMany(n: number) {
        for (let i = 0; i < n; i++) {
            await this.create()
        }
    }

    static async get(): Promise<Contact> {
        return prismaClient.contact.findFirstOrThrow({
            where: {
                username: "test"
            }
        })
    }

}

export class AddressTest {

    static async create() {
        const contact = await ContactTest.get()
        await prismaClient.address.create({
            data: {
                contact_id: contact.id,
                street: "Jalan",
                city: "Kota",
                province: "Provinsi",
                country: "Indonesia",
                postal_code: "12345"
            }
        })
    }

    static async get(): Promise<Address> {
        return prismaClient.address.findFirstOrThrow({
            where: {
                contact: {
                    username: "test"
                }
            }
        })
    }

    static async deleteAll() {
        await prismaClient.address.deleteMany({
            where: {
                contact: {
                    username: 'test'
                }
            }
        })
    }

}
