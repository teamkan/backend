const Priorities = require('../models/Priorities');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const PrioritiesController = () => {
  const createPriorities = async (req, res) => {
    const { body } = req;

    if (body.naziv) {
      try {
        const priorities = await Priorities.create({
          naziv: body.naziv
        });

        return res.status(200).json({ priorities });
      } 
      catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Priorities name not provided' });
  };

  const getAll = async (req, res) => {
    try {
      const priorities = await Priorities.findAll();

      return res.status(200).json({ priorities });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  return {
    createPriorities,
    getAll,
  };
};

module.exports = PrioritiesController;
