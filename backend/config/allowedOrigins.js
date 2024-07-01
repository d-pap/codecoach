const allowedOrigins = [
    // these are the hosts we will allow to access our API

    // url for when we make our React frontend
    // (it will be on port 3000 during development)
    "http://localhost:3000",
    "http://localhost:3500",

    // next, we put the domains we register for our website
    // we need 1 with 'www.' and 1 without bc these are strings
    //'https://www.codecoach.com',
    //'https://codecoach.com'
];

module.exports = allowedOrigins;
