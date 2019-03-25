const User = require('../models/User');
const Role = require('../models/Role');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const UserController = () => {
  const createUser = async (req, res) => {
    const { body } = req;

    if (body.password === body.password2) {
      try {
        const user = await User.create({
          username: body.username,
          email: body.email,
          password: body.password,
          firstname: body.firstname,
          lastname: body.lastname,
          roleId: body.roleId
        });

        return res.status(200).json({ user });
      } 
      catch (err) {
        /*if(err.name === "SequelizeUniqueConstraintError")
          return res.status(500).json({ msg: 'Internal server error' });*/

        //console.log(err.errors)
        if(err.errors) {
          var errReturn = ''
          err.errors.forEach(error => {
            errReturn += error.message.replace(/\w\S*/g, function(txt) {
                  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
              ) + '\n';
          });
          return res.status(500).json({ msg: errReturn });
        }

        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
  };

  const authenticate = async (req, res) => {
    const { email, username, password } = req.body;

    if (email && password) {
      try {
        const user = await User
          .findOne({
            where: {
              $or: [{username: email}, {email: email}]
            },
          });

        if (!user) {
          return res.status(400).json({ msg: 'Invalid username or password.' });
        }

        if (bcryptService().comparePassword(password, user.password)) {
          const token = authService().issue({ id: user.id });

          return res.status(200).json({ token, user });
        }

        return res.status(401).json({ msg: 'Invalid username or password.' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Username and password must be provided.' });
  };

  const getAll = async (req, res) => {
    try {
      const users = await User.findAll({
        include: [
          { model: Role, required: true, as: 'role'}
        ]
      });

      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  return {
    createUser,
    authenticate,
    getAll,
  };
};

module.exports = UserController;
