export const environment = {
  production: true,

  apiUrl: 'https://financeiroteste-angular.herokuapp.com:8080',
  // apiUrl: 'http://localhost:8080',
  // tokenAllowedDomains: [  /localhost:8080/ ],
  tokenAllowedDomains: [ /financeiroteste-angular.herokuapp.com/ ],
  tokenDisallowedRoutes: [/\/oauth\/token/],
};
