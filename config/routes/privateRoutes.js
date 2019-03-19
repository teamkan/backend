const privateRoutes = {
  'GET /users': 'UserController.getAll',
  'POST /users': 'UserController.createUser',
  'POST /createProject': 'ProjectController.createProject',
  'GET /projects': 'ProjectController.getAll',
  'GET /projectusers': 'UserProjectController.findByProject',
  'GET /roles': 'RoleController.getAll',
  'GET /userprojects': 'UserProjectController.findById',
  'POST /projects': 'ProjectController.createProject',
  'POST /projects/assignUser': 'UserProjectController.assignUserToProject',
  'DELETE /projects/assignUser': 'UserProjectController.deleteUserProject',
  'GET /userproject': 'UserProjectController.getAll',
  'GET /roles': 'RoleController.getAll',
  'POST /createSprint': 'SprintController.createSprint',
  'GET /projects': 'ProjectController.getAll',

  'GET /projects/filter': 'ProjectController.getByFilter',
  'GET /projects/users/filter': 'UserProjectController.getByFilter'
};

module.exports = privateRoutes;