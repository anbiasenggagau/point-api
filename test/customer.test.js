const { app } = require('../server')
const request = require('supertest')
const res = require('express/lib/response')

let accessToken = ''

describe("Customer Route Test", () => {

    it('Deliberate Input Non Existing User', () => {
        return request(app)
            .post('/auth/login')
            .send({
                username: 'anbia',
                password: 'asdasd'
            })
            .expect(404)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).toMatchObject({
                    error: {
                        message: "Cannot find the user"
                    }
                })
            })
    })

    it('Deliberate Input Wrong Password', () => {
        return request(app)
            .post('/auth/login')
            .send({
                username: 'anbiasenggagau',
                password: 'dsadsa'
            })
            .expect(401)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).toMatchObject({
                    error: {
                        message: "Wrong password"
                    }
                })
            })
    })

    it('Authenticate User', () => {
        return request(app)
            .post('/auth/login')
            .send({
                username: 'anbiasenggagau',
                password: 'asdasd'
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                accessToken = res.body.data.access_token
                expect(res.body).toMatchObject({
                    data: {
                        id: expect.any(String),
                        name: expect.any(String),
                        first_name: expect.any(String),
                        last_name: expect.any(String),
                        email: expect.any(String),
                        token_type: expect.any(String),
                        access_token: expect.any(String),
                        token_id: expect.any(String),
                        token_expires_in: expect.any(Number)
                    }
                })
            })
    })

    it('Token Not Included', () => {
        return request(app)
            .get('/master/customers/download')
            .expect(401)
    })

    it('Wrong Token', () => {
        return request(app)
            .get('/master/customers/download')
            .set('Authorization', `Bearer asddsadawawe12312asd`)
            .expect(403)
    })

    it('Download', () => {
        return request(app)
            .get('/master/customers/download')
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200)
            .expect('Content-Type', /sheet/)
    })

    it('Not Authorized to Download', async () => {
        let wait = await request(app)
            .post('/auth/login')
            .send({
                username: 'senggagau',
                password: 'asdasd'
            })
            .then(res => {
                accessToken = res.body.data.access_token
            })

        return request(app)
            .get('/master/customers/download')
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(403)

    })

})