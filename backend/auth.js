const express = require('express')
// const bodyParser = require('body-parser')
const mysql = require('mysql');
const bcrypt = require("bcrypt")

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
app.post('/signup',async (req, res) => {
	const username = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password,10);

	connection.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM user_auth WHERE username = ? "
        const searchQuery = mysql.format(sqlSearch, [username])
        const sqlInsert = "INSERT INTO user_auth (username,password) VALUES (?,?)"
        const insert_query = mysql.format(sqlInsert, [username, hashedPassword])
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



app.post("/login", (req, res) => {
    const username = req.body.username;
	const password = req.body.password;

    connection.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM user_auth WHERE username = ? "
        const searchQuery = mysql.format(sqlSearch, [username])
        connection.query(searchQuery, async (err, result) => {
            connection.release()

            if (err) throw (err)

            if (result.length === 0) {
                console.log("------user doesnot exists-------")

                res.status(404).json({
                    msg: "User does not exists. Please /register",
                });
            }
            else {
                const hashedPassword = result[0].password
                if (await bcrypt.compare(password, hashedPassword)) {
                    // const token = generateAccessToken({ user: result[0] })
                    // req.session.token = token
                    console.log("------user-logged-in-------")
                    res.status(200).json({
                        msg: 'Login Successful',
                        // "token": token,
                        user: result[0]
                    });
                } else {
                    console.log("------wrong password-------")

                    res.status(401).json({
                            msg: 'You entered the wrong password!'
                        });
                }
            }
        })
    })
}) // access tokens after login ends


app.listen(4000, () => {
	console.log("running server successfully");
});
