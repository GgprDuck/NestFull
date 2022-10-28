const authConstants = {
  jwt: {
    secret: 'superSecurity',
    expirationTime: {
      accessToken: '1d',
      refreshToken: '7d',
    },
  },
  redis: {
    expirationTime: {
      jwt: {
        accessToken: 86400, 
        refreshToken: 604800, 
      },
    },
  },
};

export default authConstants;
