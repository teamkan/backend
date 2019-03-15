const privateRoutes = {
  'GET /users': 'UserController.getAll',
  'POST /users': 'UserController.createUser',
  'POST /createProject': 'ProjectController.createProject',
  'GET /projects': 'ProjectController.getAll',
  'GET /projectusers': 'UserProjectController.findByProject',
  'GET /roles': 'RoleController.getAll',
  'GET /userprojects': 'UserProjectController.findById',
  'POST /projects': 'ProjectController.createProject',
  'POST /assignUser': 'UserProjectController.assignUserToProject',
  'GET /userproject': 'UserProjectController.getAll',
  'GET /roles': 'RoleController.getAll',
};

module.exports = privateRoutes;