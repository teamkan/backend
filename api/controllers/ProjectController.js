const Project = require('../models/Project');
const UserProject = require('../models/UserProject');
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
    } 
    catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getByFilter = async (req, res) => {
    try {
      const { projectName, projectId } = req.query;
      var conditions = {};
      
      if(projectName)
        conditions.name = projectName;
      if(projectId)
        conditions.id = projectId;

      const projects = await Project.findAll({
        where: conditions
      });
      
      return res.status(200).json({ projects });

    } 
    catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getUserProjects = async (req, res) => {
    try {
      const { projectId } = req.params;
      
      const projects = UserProject.findAll({
        where: {
          projectId: projectId
        },
      });

      return res.status(200).json({ projects });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    createProject,
    getAll,
    getUserProjects,
    getByFilter
  };
};

module.exports = ProjectController;
