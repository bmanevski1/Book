const bcrypt = require('bcrypt');
const User = require('../models/User');
const { createJwt } = require('../middleware/jwt');

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json('Missing username!');
  }

  if (!password) {
    return res.status(400).json('Missing password!');
  }

  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return res.status(400).json('User does not exist');
    }

    const decryptionAndComparisonResult = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (decryptionAndComparisonResult === true) {
      const newToken = createJwt(username);
      // req.session.activeUser = username;
      return res.status(200).json(newToken);
    } else {
      return res.status(401).json('Wrong password!');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json('Could not log in!');
  }
};

const registerUser = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || username.length < 6) {
    return res.status(400).json('Username too short!');
  }

  if (!password || password.length < 6) {
    return res.status(400).json('Invalid password!');
  }

  try {
    const foundUsers = await User.find({ username });
    if (foundUsers.length > 0) {
      return res.status(409).json('Username taken!');
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      password: encryptedPassword,
    });
    return res.status(201).json('User created!');
  } catch (error) {
    console.log(error);
    return res.status(500).json('Cannot create user.');
  }
};

module.exports = {
  loginUser,
  registerUser,
};