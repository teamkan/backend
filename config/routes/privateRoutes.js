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
  'PUT /projects/assignUser': 'UserProjectController.updateUserInProject',
  'GET /userproject': 'UserProjectController.getAll',
  'GET /roles': 'RoleController.getAll',
  'POST /createSprint': 'SprintController.createSprint',

  'POST /stories': 'StoryController.createStory',
  'GET /stories': 'StoryController.getAll',
  'GET /stories/filter': 'StoryController.getByFilter',

  'POST /sprints': 'SprintController.createSprint',
  'GET /sprints': 'SprintController.getAll',
  'GET /sprints/filter': 'SprintController.getByFilter',

  'GET /projects/filter': 'ProjectController.getByFilter',
  'GET /projects/users/filter': 'UserProjectController.getByFilter',

  'DELETE /projects/users': 'UserProjectController.deleteUsersFromProject',
  'PUT /projects': 'ProjectController.updateProjectName'
};

module.exports = privateRoutes;