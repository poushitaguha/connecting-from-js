const pg = require("pg");
const settings = require("./settings"); // settings.json

const person = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1", [person], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    console.log("Searching...");
    console.log("Found " + result.rows.length + " person(s) by the name " + "'" + person + "':");
    let count = 0;
    result.rows.forEach(person => {
        count += 1;
        let firstName = person.first_name;
        let lastName = person.last_name;
        let birthdate = person.birthdate;
        birthdate = birthdate.toISOString().slice(0,10)
        console.log("- " + count + ": ", firstName, lastName + ", born " + "'" + birthdate + "'");
    });

    client.end();
  });
});