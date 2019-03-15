const Story = require('../models/Story');
const Priorities = require('../models/Priorities');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const StoryController = () => {
  const createStory = async (req, res) => {
    const { body } = req;

    if (body.naziv) {
      try {
        const story = await Story.create({
          naziv: body.naziv,
          besedilo: body.besedilo,
          testi: body.testi,
          prioritiesId: body.prioritiesId,
          poslovna_vrednost: body.poslovna_vrednost
        });

        return res.status(200).json({ story });
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
      const storys = await Story.findAll({
        include: [
          { model: Priorities, as: 'priorities'}
        ]
      });

      return res.status(200).json({ storys });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  return {
    createStory,
    getAll,
  };
};

module.exports = StoryController;
