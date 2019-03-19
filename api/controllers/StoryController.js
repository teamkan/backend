const Story = require('../models/Story');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const StoryController = () => {
  const createStory = async (req, res) => {
    const { body } = req;

    if (!body.title || !body.description) {
      return res.status(400).json({ msg: 'Bad Request: Role name not provided' });
    }

    try {
      const story = await Story.create({
        title: body.title,
        description: body.description,
        tests: body.tests,
        businessValue: body.businessValue,
        priority: body.priority,
        projectId: body.projectId
      });

      return res.status(200).json({ story });
    } 
    catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getAll = async (req, res) => {
    try {
      const stories = await Story.findAll({      });

      return res.status(200).json({ stories });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getByFilter = async (req, res) => {
    try {
      const { projectId, title } = req.query;
      var conditions = {};
      
      if(title)
        conditions.title = title;
      if(projectId)
        conditions.projectId = projectId;

      const stories = await Story.findAll({
        where: conditions
      });
      
      return res.status(200).json({ stories });

    } 
    catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  return {
    createStory,
    getAll,
    getByFilter
  };
};

module.exports = StoryController;
