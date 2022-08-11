//importing packages
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

// firebase aadmin setup
let serviceAccount = require("./images/sweetscents-109e8-firebase-adminsdk-zed2d-038cd49851.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


let db = admin.firestore();
// decllare static path
let staticPath = path.join(__dirname, "public");

// inititalizing express.js

const app = express();

//middlewares
app.use(express.static(staticPath));
app.use(express.json());

//routes
//home routes

app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})

// signup route
app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
})

app.post('/signup', (req, res) => {
    let { name, email, password, number, tac, notification } = req.body;


// form validations
if(name.value.length < 3) {
    return res.json({'alert': 'name must be 3 letters long'});
} else if(!email.value.length){
    return res.json({'alert': 'enter your email'});
} else if (password.value.length < 8){
    return res.json({'alert': 'password should be 8 letters long'});
} else if(!number.value.length){
    return res.json({'alert': 'enter your phone number'});
} else if(!Number(number.value) || number.value.length < 7){
    return res.json({'alert': 'invalid number, please enter valid one'});
} else if(!tac){
    showAlert({'alert': 'you must agree to our terms and conditions'});
}
    // store user id
        db.collection('users').doc(email).get()
        .then(user => {
            if(user.exists){
                return res.json({'alert': 'email already exists'});
            } else {
                // encrypt the password before storing it
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        db.collection('users').doc(email).set(req.body).then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body,email,
                                seller: req.body.seller,
                            })
                        })
                    })
                })
            }
        })

  /*  app.post('/signup', (req, res) => {
        console.log(req.body);
        res.json('data received');*/
})


// login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login") );
})

app.get('/login', (req, res) => {
    let {email, password} = req.body;

    if(!email.length || !password.length){
        return res.json({'alert': 'fill all the inputs'})
    }

    db.collection('user').doc(email).get()
    .then(user => {
        if(!user.exists){// if email does not exits
            return res.json({'alert': 'log in email does not exist'})
        }else{
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result){
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller,
                    })
                } else {
                    return res.json({'alert': 'password in incorrect'});
                }
            })
        }
    })
})
    // 404 route

app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, "404"));
})

app.use((req, res) => {
    res.redirect('/404');
})

app.listen(5500, () => {
    console.log('listening on port 5500.......');
})