const request = require('supertest');

let server;

describe('/chat', () => {
	beforeEach(() => (server = require('../../app')));
	afterEach(() => server.close());

	describe('GET /', () => {
		it('Shoud return all chats', async () => {
			const res = await request(server).get('/chat');
			console.log(res.data);
			expect(res.status).toBe(200);
		});
	});
});
