Welcome To PotluckPLannerPlus' API!

https://potluckplannerplus.herokuapp.com/ is the base URL for this API

// Auth Router

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

// Auth Restricted Endpoints

[GET] /auth/organizers - requires a valid token in authorization header
returns an array of organizers currently in database

[GET] /auth/logout - requires a valid token in authorization header
returns a logout message

// Organizer Router - Restricted

[GET] /org/:id/potlucks - requires a valid organizer id in params
returns an array of potlucks by given organizer_id

[POST] /org/:id - requires valid organizer id in params, unique potluck name, and valid date/time/location as such -
{
    "potluck_name": "Thanksgiving",
    "date": "Nov 25, 2021",
    "time": "18:00",
    "location": "My House"
} returns newly created potluck as such -
{
    "organizer_id": 1,
    "potluck_name": "Thanksgiving",
    "date": "2021-11-25T08:00:00.000Z",
    "time": "18:00:00",
    "location": "My House"
}

// Potluck Router

[GET] /potlucks
returns an array of all potlucks currently in database

[GET] /potlucks/:id - requires a valid potluck_id in params
returns a potluck by given id

[GET] /potlucks/:id/menu - requires a valid potluck_id in params
returns an array of the potluck menu by given id with food_item of the shape -

[
    {
        'food_item_id': 1,
        'food_item': 'Cheese'
    },
    etc...
]

[GET] /potlucks/:id/guests - requires a valid potluck_id in params
returns an array of the potluck guest list by given id with guest of the shape -

[
    {
        'guest_id': 1,
        'guest_name': 'foo',
        'attending': false
    }
]

//Potluck Restricted Endpoints

[PUT] /potlucks/:id - requires a valid potluck_id in params, valid potluck body as such -

{
    "organizer_id": 1,
    "potluck_name": "Christmas",
    "date": "2021-11-25T08:00:00.000Z",
    "time": "18:00:00",
    "location": "My House"
} - returns newly updated potluck object as such -
{
    "organizer_id": 1,
    "potluck_name": "Christmas",
    "date": "2021-11-25T08:00:00.000Z",
    "time": "18:00:00",
    "location": "My House"
}

[POST] /potlucks/:id/guests - requires a valid potluck_id in params, valid guest body as such -

{
    "guest_name": 'foo'
}
returns a newly created guest object as such -
{
    'guest_id': 1,
    'guest_name': 'foo',
    'attending': false,
    'potluck_id': 1
}

[POST] /potlucks/:id/menu - requires a valid potluck_id in params, valid food_item body as such -

{
    "food_item": 'foo'
}
returns a newly created food_item object as such -
{
    'food_item_id': 1,
    'food_item': 'foo',
    'potluck_id': 1
}

// Guest Router

[PUT] /guests/:id - requires a valid guest id in params, valid guest body
returns a newly updated guest body

[DELETE] /guests/:id - requires a valid guest id in params
returns a deleted message

// Menu Router

[PUT] /menu/:id - requires a valid food_item id in params, valid food_item body
returns a newly updated food_item body

[DELETE] /menu/:id - requires a valid food_item id in params
returns a deleted message
