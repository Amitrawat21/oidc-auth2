const app = require('express')();
require('dotenv').config()

const { auth, requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'L0YSiFmp5N0ZjTbYkqdANfTqMqk4GrFO',
  issuerBaseURL: 'https://dev-bfno5dtv.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req,res)=>{

    res.send(JSON.stringify(req.oidc.user))
})
app.listen(3000,()=>{
    console.log('listening on 3000');
})