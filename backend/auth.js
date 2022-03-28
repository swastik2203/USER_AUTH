const express = require('express')
// const bodyParser = require('body-parser')
const mysql = require('mysql');
// const cors = require('cors');
// const axios = require('axios')

const app = express();
app.use(express.json());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// app.use(cors());
// app.use(
// 	cors({
// 	origin: ['http://localhost:3000'],
// 	methods: ['GET', 'POST'],
// 	credentials: true,
// 	})
//    );

// create mysql coonection
const connection = mysql.createPool({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'students'
});
// connect to the database
connection.getConnection(function(error){
    if(error) throw error
    else console.log('Connected to the student database successfully!')
    
  });  
// module.exports = connection;  
app.post('/signup', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	connection.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM user_auth WHERE username = ? OR password = ?"
        const searchQuery = mysql.format(sqlSearch, [username, password])
        const sqlInsert = "INSERT INTO user_auth (username,password) VALUES (?,?)"
        const insert_query = mysql.format(sqlInsert, [username, password])
        // ? will come from client in order


		 connection.query(searchQuery, async (err, result) => {
            if (err) throw (err)
            if (result.length !== 0) {
                connection.release()
                console.log("-------- user already exists --------")
                res.status(409).json({
                    msg: "User already Exists",
                });
            }
            else {
                connection.query(insert_query, (err, result) => {
					connection.release();
					if (err)
						throw (err);
					console.log("-------- new user created --------");
					res.status(201).json({
						msg: "New User Created",
						user: {
							// user_id: result.insertId,
							user_name: username
						}
					});
				})
            }
        })

		
    })
})

app.listen(4000, () => {
	console.log("running server successfully");
});
