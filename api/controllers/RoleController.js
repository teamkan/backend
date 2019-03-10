const Role = require('../models/Role');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const RoleController = () => {
  const createRole = async (req, res) => {
    const { body } = req;

    if (body.name) {
      try {
        const role = await Role.create({
          name: body.name
        });

        return res.status(200).json({ role });
      } 
      catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Role name not provided' });
  };

  const getAll = async (req, res) => {
    try {
      const roles = await Role.findAll();

      return res.status(200).json({ roles });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  return {
    createRole,
    getAll,
  };
};

module.exports = RoleController;
