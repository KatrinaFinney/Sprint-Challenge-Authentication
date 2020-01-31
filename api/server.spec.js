const request = require('supertest');
const server = require('./server.js');
const jokesRouter = require('../jokes/jokes-router');
const authRouter = require('../auth/auth-router');

describe('server', function()  {
    it('runs the tests', function() {
        expect(true).toBe(true);
    })

    describe('GET /', function() {
        it('should return 200 OK', function() {
          return request(server).get('/').then(res => {
                expect(res.status).toBe(200);
            })
        })
        it('should return JSON', function() {
          return request(server).get('/').then(res => {
                expect(res.type).toMatch(/json/i);
            })
        })
        it('should return JSON', function() {
          return request(server).get('/').then(res => {
                expect(res.body).toEqual({ api: "Congratulations" });
            })
        })
    })
})
describe('jokesRouter', function()  {
    it('runs the tests', function() {
        expect(true).toBe(true);
    })

    describe('GET /', function() {
        it('should return 200 OK', function() {
          return request(server).get('/').then(res => {
                expect(res.status).toBe(200);
            })
        })
        it('should return JSON', function() {
          return request(server).get('/').then(res => {
                expect(res.type).toMatch(/json/i);
            })
        })
       
    })
})
describe('authRouter', function()  {
    it('runs the tests', function() {
        expect(true).toBe(true);
    })

    describe('POST /register', function() {
        
        it('should return JSON', function() {
          return request(server).post('/register').then(res => {
                expect(res.type).toMatch(/html/i);
            })
        })
       
    })
})