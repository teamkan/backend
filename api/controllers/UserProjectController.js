const UserProject = require('../models/UserProject');
const Project = require('../models/Project');
const Role = require('../models/Role');
const User = require('../models/User');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const UserProjectController = () => {
  const createUserProject = async (req, res) => {
    const { body } = req;

    if (body.UserId && body.ProjectId && body.roleId) {
      try {
        const user_project = await UserProject.create({
          userId: body.userId,
          projectId: body.projectId,
          roleId: body.roleId
        });

        return res.status(200).json({ user_project });
      } 
      catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: UserProject name not provided' });
  };

  const findById = async (req, res) => {
    //const { body } = req;
    console.log(req.query.userId);
    if(req.query.userId){
      try {
        const listProject = await UserProject.findAll({
          where: {userId: req.query.userId},
          include: [
            { model: Role, required: true, as: 'role'},
            { model: Project, as: 'project'},
            { model: User, as: 'user'}
          ]
        },
        

        );

        return res.status(200).json({ listProject });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }
    return res.status(400).json({ msg: 'Bad Request: UserId not provided ' });
  };

  const findByProject = async (req, res) => {
    //const { body } = req;
    console.log(req.query.projectId);
    if(req.query.projectId){
      try {
        const listProject = await UserProject.findAll({
          where: {projectId: req.query.projectId},
          include: [
            { model: Role, required: true, as: 'role'},
            { model: User, as: 'user'}
          ]
        },
        

        );

        return res.status(200).json({ listProject });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }
    return res.status(400).json({ msg: 'Bad Request: UserId not provided ' });
  };

  const assignUserToProject = async (req, res) => {
    const { body } = req;
    console.log(body);
    if (body.userId && body.projectId && body.roleId) {
      try {
        const user_project = await UserProject.create({
          userId: body.userId,
          projectId: body.projectId,
          roleId: body.roleId
        });

        return res.status(200).json({ user_project });
      } 
      catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: UserProject name not provided ' });
};

  const getAll = async (req, res) => {
    try {
      const user_projects = await UserProject.findAll({
        include: [
          { model: Role, required: true, as: 'role'},
          { model: Project, as: 'project'},
          { model: User, as: 'user'}
        ]
      });

      return res.status(200).json({ user_projects });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getByFilter = async (req, res) => {
    try {
      const { userId, projectId } = req.query;
      var conditions = {};
      
      if(userId)
        conditions.userId = userId;
      if(projectId)
        conditions.projectId = projectId;

      const userProjects = await UserProject.findAll({
        where: conditions,
        include: [
          { model: Project, as: 'project'},
          { model: User, as: 'user'}
        ]
      });


      return res.status(200).json({ userProjects });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const deleteUserProject = async (req, res) => {
    const { body } = req;

    if (body.userId && body.projectId) {
      try {

        const user_project = await UserProject.destroy({
          where: {
            $and: [{userId: body.userId}, {projectId: body.projectId}]
          }
        });

        if (!user_project)
          return res.status(400).json({ msg: 'Bad Request: User does not belog to this project' })

        return res.status(200).json({ user_project });
      } 
      catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: UserId and ProjectId not provided' });
  };

  return {
    createUserProject,
    findById,
    findByProject,
    assignUserToProject,
    getAll,
    getByFilter,
    deleteUserProject
  };
};

module.exports = UserProjectController;
