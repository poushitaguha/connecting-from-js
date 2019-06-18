const settings = require("./settings"); // settings.json

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : settings.hostname,
      user : settings.user,
      password : settings.password,
      database : settings.database
    }
  });

const firstName = process.argv[2];
const lastName = process.argv[3];
const dateOfBirth = process.argv[4];

return knex.insert( [{first_name: firstName, last_name: lastName, birthdate: dateOfBirth}] )
  .into('famous_people')
  .then(function(){
    knex.destroy();
  })
  .catch(function(error) {
    console.error(error);
  });
