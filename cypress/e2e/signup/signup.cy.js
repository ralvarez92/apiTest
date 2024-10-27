describe('Login API Test', () => {
	const generateRandomUsername = () => {
    return `user_${Math.random().toString(36).substr(2, 9)}`; // Genera un nombre de usuario aleatorio
	};
//Test Case #1
it('Test for valid registration', () => 
    {
    const validUsernama = {
      username: generateRandomUsername(),
      password: 'password123'
    };

    cy.request({
        method: 'POST',
        url: 'https://api.demoblaze.com/signup',
        body: validUsernama
      }).then((response) => {
        expect(response.status).to.eq(200);
    });
    });

//Test Case #2
  it('Test for invalid registration', () => 
    {
    const validUsernama = {
      username: 'DemoApiTestOK',//generateRandomUsername(),
      password: 'password123'
    };

    cy.request({
        method: 'POST',
        url: 'https://api.demoblaze.com/signup',
        body: validUsernama
      }).then((response) => {
        expect(response.status).to.eq(200);
		cy.on('window:alert', (str) => 
        {
          expect(str).to.equal('This user already exist.');
        });
		expect(response.body).to.have.property('errorMessage', 'This user already exist.');
    });
    });
});