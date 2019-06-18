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

const name = process.argv[2];

let data = knex.select("*").from("famous_people").where("first_name", name);

let count = 0;

data.then(function(result) {
  console.log("Searching...");
  console.log("Found " + result.length + " person(s) by the name " + "'" + name + "':");

    result.forEach(person => {
    count += 1;
    let firstName = person.first_name;
    let lastName = person.last_name;
    let birthdate = person.birthdate;
    birthdate = birthdate.toISOString().slice(0,10)
    console.log("- " + count + ": ", firstName, lastName + ", born " + "'" + birthdate + "'");

    knex.destroy();
   })
});
