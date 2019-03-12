const UserProject = require('../models/UserProject');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const UserProjectController = () => {
  const createUserProject = async (req, res) => {
    const { body } = req;

    if (body.UserId && body.ProjectId && body.roleId) {
      try {
        const user_project = await UserProject.create({
          user_id: body.userId,
          project_id: body.projectId,
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
    const { body } = req;
    console.log(body.userId);
    if(body.userId){
      try {
        const listProject = await UserProject.findAll({
          where: {user_id: body.userId}
        }

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
          user_id: body.userId,
          project_id: body.projectId,
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
      const user_projects = await UserProject.findAll(
      );

      return res.status(200).json({ user_projects });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  return {
    createUserProject,
    findById,
    assignUserToProject,
    getAll,
  };
};

module.exports = UserProjectController;
