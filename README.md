# demo

                    <--- User registatration, Fetch, Login, Logout -->

POST http://localhost:3000/api/v1/user/register
{
        "email": "ajith@gmail.com",
         "password": "123456"      
}

GET http://localhost:3000/api/v1/user/


POST http://localhost:3000/api/v1/user/login
{
        "email":"sujith@gmail.com",
        "password": "123456"
}


GET http://localhost:3000/api/v1/user/logout
    pass Bearer token generated as result of login action

                        <--------- User Profile create, fetch --------------->


POST http://localhost:3000/api/v1/userProfiles/add
{
    "firstName": "Ajith",
    "lastName": "Gopi",
    "address": " service"
}

GET http://localhost:3000/api/v1/userProfiles/

                    <------------- Note create, update, delete, fetch ------->

GET http://localhost:3000/api/v1/notes/all
<------------- below 3 api neededs Bearer token generated from logon action. iT IS AUTHENTICATED api'S

POST http://localhost:3000/api/v1/notes/add
{
        "noteText": "node JS",
        "userId": "6262f6e0873a869106c09213",
        "userProfile": "6262f86a873a869106c09218"
}

POST http://localhost:3000/api/v1/notes/update
{
        "id": "6262fdd253a4aac00612c50e",

        "noteText": "Sample",
        "userId": "6262f6e0873a869106c09213",
        "userProfile": "6262f86a873a869106c09218"
}

DELETE http://localhost:3000/api/v1/notes/
{
        "id": "6262fdd253a4aac00612c50e"      
}
