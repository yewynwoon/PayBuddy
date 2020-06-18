const CLIENT_ID = process.env.CLIENT_ID || '0oaa2hazvvDXgKxtF4x6';
const ISSUER = process.env.ISSUER || 'https://dev-203865.okta.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = true;

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: 'http://34.71.21.0/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
};
