const express = require('express')  
const app = express()  
const port = 3000;  
const bcrypt = require('bcrypt');

app.use(express.json());

let users = {};

app.get('/', (req, res) => {  
    res.send('Hello World!'); 
 })  

app.post('/register', (req, res) => {
    const{username,email,password,age} = req.body; 
    const hash = bcrypt.hashSync(password, 10);
    users[username] = hash; 

    console.log("Register Information:");
    console.log({username,email, password: hash, age}); 
    res.send({username,email, password: hash, age});
})

app.post('/login', (req, res) => {
    const { username, password } = req.body; 
    console.log("Login Information:");

    if (!users[username]) { 
        res.send('Invalid username');
        console.log("Invalid username"); 

    } else if (!bcrypt.compareSync(password, users[username])) { 
        res.send('Invalid password'); 
        console.log("Invalid password");

    } else { 
        res.send('Login Success'); 
        console.log("Login Success");
        console.log(`Successful login for username: ${username}`);
        console.log(`Hashed password: ${users[username]}`);
    } 
})

 app.listen(port, () => {  
    console.log(`Server listening at http://localhost:${port}`); 
 
 })  