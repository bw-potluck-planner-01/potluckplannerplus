Welcome To PotluckPLannerPlus' API!

https://potluckplannerplus.herokuapp.com/ is the base URL for this API

[POST] /auth/register - requires a unique username and password as such-
{
    username: 'Marcos',
    password: '1234'
} and returns a newly created organizer as such -
{
    'organizer_id': 1,
    'username': 'Marcos',
    'password': 'hashed-password'
}

[POST] /auth/login - requires a valid set of credentials as such -
{
    username: 'Marcos',
    password: '1234'
} and returns a welcome message as well as a newly created token as such -
{
    message: 'Welcome back, Marcos'
    token: 'token'
}

