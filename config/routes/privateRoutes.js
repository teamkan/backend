const privateRoutes = {
  'GET /users': 'UserController.getAll',
  'POST /users': 'UserController.createUser',
  /*'POST /createProject': 'ProjectController.createProject',
  'GET /roles': 'RoleController.getAll',
  'GET /project': 'ProjectController.getAll',
  'POST /createProject': 'ProjectController.createProject',
  'POST /assignUser': 'UserProjectController.assignUserToProject',
  'GET /userproject': 'UserProjectController.getAll',*/
};

module.exports = privateRoutes;
