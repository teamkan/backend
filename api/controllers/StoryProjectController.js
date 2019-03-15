const StoryProject = require('../models/StoryProject');
const Project = require('../models/Project');
const Story = require('../models/Story');
const User = require('../models/User');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const StoryProjectController = () => {
  const createStoryProject = async (req, res) => {
    const { body } = req;

    if (body.storyId && body.projectId ) {
      try {
        const story_project = await StoryProject.create({
          storyId: body.storyId,
          projectId: body.projectId,
        });

        return res.status(200).json({ story_project });
      } 
      catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: StoryProject name not provided' });
  };

  const findByProject = async (req, res) => {
    //const { body } = req;
    console.log(req.query.projectId);
    if(req.query.projectId){
      try {
        const listProject = await StoryProject.findAll({
          where: {projectId: req.query.projectId},
          include: [
            { model: Project, as: 'project'},
            { model: Story, as: 'story'}
          ]
        },
        

        );

        return res.status(200).json({ listProject });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }
    return res.status(400).json({ msg: 'Bad Request: projectId not provided ' });
  };

  const getAll = async (req, res) => {
    try {
      const story_project = await StoryProject.findAll({
        include: [
          { model: Project, as: 'project'},
          { model: Story, as: 'story'}
        ]
      });

      return res.status(200).json({ story_project });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  return {
    createStoryProject,
    findByProject,
    getAll,
  };
};

module.exports = StoryProjectController;
