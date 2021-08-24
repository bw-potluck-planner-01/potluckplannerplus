Welcome To PotluckPLannerPlus' API!

https://potluckplannerplus.herokuapp.com/ is the base URL for this API

[POST] /auth/register - requires a unique username and password as such-
{
    username: 'foo',
    password: '1234'
} and returns a newly created organizer as such -
{
    'organizer_id': 1,
    'username': 'foo',
    'password': 'hashed-password'
}

[POST] /auth/login - requires a valid set of credentials as such -
{
    username: 'foo',
    password: '1234'
} and returns a welcome message as well as a newly created token as such -
{
    message: 'Welcome back, foo'
    token: 'token'
}

// Restricted Endpoints

[GET] /auth/organizers - requires a valid token in authorization header
returns an array of organizers currently in database

[GET] /org/:id/potlucks - requires a valid organizer id in params
returns an array of potlucks by given organizer_id

