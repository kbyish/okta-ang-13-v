// const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK } = process.env;

// export default {
//   oidc: {
//     clientId: CLIENT_ID,
//     issuer: ISSUER,
//     redirectUri: 'http://localhost:4200/login/callback',
//     scopes: ['openid', 'profile', 'email'],
//     testing: {
//       disableHttpsCheck: `${OKTA_TESTING_DISABLEHTTPSCHECK}`
//     }
//   },
//   resourceServer: {
//     messagesUrl: 'https://localhost:8000/api/messages',
//   },
// };

//issuer: 'https://{yourOktaDomain}/oauth2/default',

export default {
  oidc: {
    clientId: '0oa2yjbi07H9YNwQI5d7',
    issuer: 'https://dev-00314289.okta.com/oauth2/default',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
    // testing: {
    //   disableHttpsCheck: `${OKTA_TESTING_DISABLEHTTPSCHECK}`
    // }
  },
  resourceServer: {
    messagesUrl: 'https://localhost:8000/api/messages',
  },
};
