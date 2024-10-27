describe('Login API Test', () => {
//Test Case #1
  it('Test for valid credential', () => 
    {
    const validCredentials = {
      username: 'DemoApiTestOK',
      password: 'password123'
    };

    cy.request({
        method: 'POST',
        url: 'https://api.demoblaze.com/login',
        body: validCredentials
      }).then((response) => {
        expect(response.status).to.eq(200);
        });
    });


//Test Case #2
  it('Test for invalid User', () => {
    const invalidUser = {
      username: 'OKuserDemoApiTest',
      password: '123456'
    };

    cy.request({
      method: 'POST',
      url: 'https://api.demoblaze.com/login',
      body: invalidUser,
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.on('window:alert', (str) => 
        {
          expect(str).to.equal('User does not exist.');
        });
      expect(response.body).to.have.property('errorMessage', 'User does not exist.');
  });
  });

//Test Case #3
  it('Test for invalid password', () => {
    const invalidPassword = {
      username: 'DemoApiTestOK',
      password: 'wrongPassword123'
    };

    cy.request({
      method: 'POST',
      url: 'https://api.demoblaze.com/login', 
      body: invalidPassword,
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.on('window:alert', (str) => 
        {
          expect(str).to.equal('Wrong password.');
        });
      expect(response.body).to.have.property('errorMessage', 'Wrong password.');
  });
  });
});