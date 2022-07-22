import supertest from 'supertest';
import app from '../index';

const request = supertest(app)

describe('TEST THE ROUTES', () => {
    it('testing / route',async () =>{
         const response = await request.get('/');
         expect(response.status).toBe(200);
    })
})