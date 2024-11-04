import {describe, it, expect, afterEach} from "bun:test"
import app from "../src";
import {logger} from "../src/application/logging";
import {UserTest} from "./test-util";

describe('POST /api/users', () => {

    afterEach(async () => {
        await UserTest.delete();
    })

    it('should reject register new user if request is invalid', async () => {
        const response = await app.request('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username: "",
                password: "",
                name: ""
            })
        })

        const body = await response.json()
        logger.debug(body)

        expect(response.status).toBe(400)
        expect(body.errors).toBeDefined()
    });

    it('should reject register new user if username already exists', async () => {
        await UserTest.create();

        const response = await app.request('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username: "test",
                password: "test",
                name: "test"
            })
        })

        const body = await response.json()
        logger.debug(body)

        expect(response.status).toBe(400)
        expect(body.errors).toBeDefined()
    });

    it('should register new user success', async () => {
        const response = await app.request('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username: "test",
                password: "test",
                name: "test"
            })
        })

        const body = await response.json()
        logger.debug(body)

        expect(response.status).toBe(200)
        expect(body.data).toBeDefined()
        expect(body.data.username).toBe("test")
        expect(body.data.name).toBe("test")
    });

})
