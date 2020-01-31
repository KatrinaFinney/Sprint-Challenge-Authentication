const bc = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");


const Users = require("../jokes/jokes-model.js");
const secrets = require('../config/secrets.js')

router.get("/secret", (req, res, next) => {
    if (req.headers.authorization) {
        bc.hash(req.headers.authorization, 8, (err, hash) => {
            // 2^10 is the number of rounds
            if (err) {
                res.status(500).json({ oops: "it broke" });
            } else {
                res.status(200).json({ hash });
            }
        });
    } else {
        res.status(400).json({ error: "missing header" });
    }
});

router.post("/register", (req, res) => {
    let user = req.body;

    const hash = bc.hashSync(user.password, 8);

    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bc.compareSync(password, user.password)) {
                const token = generateToken(user);


                req.session.user = user;
                res.status(200).json({ message: `Welcome ${user.username}!`, token });
            } else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };
    
    const options = {
        expiresIn: '8h'
    }
    return jwt.sign(payload, secrets.jwtSecret, options);
}



router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send('could not log out');
      } else {
        res.send('see u later');
      }
    });
  }
});

module.exports = router;
