const Project = require('../models/Project');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const ProjectController = () => {
  const createProject = async (req, res) => {
    const { body } = req;

    if (body.name) {
      try {
        const project = await Project.create({
          name: body.name
        });

        return res.status(200).json({ project });
      } 
      catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Project name not provided' });
  };

  const getAll = async (req, res) => {
    try {
      const projects = await Project.findAll();

      return res.status(200).json({ projects });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  return {
    createProject,
    getAll,
  };
};

module.exports = ProjectController;
