const mysql = require('mysql')
const express = require('express');
const path = require('path');
const app = express();

const handlebars = require('express-handlebars').create({defaultLayout: 'main'});
const bodyParser = require('body-parser');
const connection = mysql.createConnection({
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'b158c78ff88189',
  password: 'a164796f',
  database: 'heroku_dfb7d11f6dc7a66'
})

connection.connect()

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended: false}));
const jsonParser = bodyParser.json();
app.use(express.static(path.join(__dirname, 'views')))





app.get('/', (req, res) => {


    res.render('home');
})

app.get('/result', (req, res) => {

    connection.query(`select polling_unit.lga_id, sum(party_score) 
    as TotalResult from announced_pu_results join polling_unit 
    on polling_unit.uniqueid = announced_pu_results.polling_unit_uniqueid
    where polling_unit.lga_id = ${req.query.search}`, (err, rows, fields) => {
  
  
  
      if(err) console.log(err);
  
      else{
          
          res.render('result', {data: rows})
          console.log(rows);
      }
    })
  
})

app.get('/result2', (req, res) => {
    
  connection.query(`select sum(party_score) as TotalResult from announced_pu_results where polling_unit_uniqueid = ${req.query.id}`, (err, rows, fields) => {

      if(err) console.error(err);
  
  
      else {
         
  
         res.render('result2', {data: rows});
         console.log(rows)
      }
  
      
  })
  



})





app.set('port', process.env.PORT || 3000);


app.listen(app.get('port'), () => {


    console.log(`Listening on port http://localhost:${app.get('port')} `);
})


//connection.end()



