const Sprint = require('../models/Sprint');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const SprintController = () => {
    const createSprint = async (req, res) => {
        const { body } = req;

        try {
            const sprints = await Sprint.findAll({
                where: {
                    startdate: {
                        [Op.lt]: body.enddate  
                    },
                    enddate: {
                        [Op.gt]: body.startdate  
                    },
                    projectId: body.projectId
                }
            });
            
            if(sprints.length > 0) {
                return res.status(400).json({ msg: 'Bad Request: selected dates overlap with existing Sprint' });
            }

            let currentDate = new Date();

            if (new Date(body.startdate).getTime() < currentDate || new Date(body.enddate).getTime() < currentDate) {
                return res.status(400).json({ msg: 'Bad Request: invalid sprint dates' });
            }

            for (var date in sprints) {
                if (date.startdate <= body.startdate && date.enddate >= body.enddate) {
                   
                }
                else if (date.startdate >= body.startdate && date.enddate <= body.enddate) {
                    return res.status(400).json({ msg: 'Bad Request: selected dates overlap with existing Sprint' });
                }
            }

            if (body.name && !isNaN(body.velocity) && body.velocity > 0) {
                try {
                    const sprint = await Sprint.create({
                        name: body.name,
                        startdate: body.startdate,
                        enddate: body.enddate,
                        velocity: body.velocity,
                        projectId: body.projectId
                    });

                    return res.status(200).json({ sprint });
                }
                catch (err) {
                    console.log(err);
                    return res.status(500).json({ msg: 'Internal server error' });
                }
            }

        } catch (err) {
            console.log(err);
        }

        return res.status(400).json({ msg: 'Bad Request: incorrect Sprint information' });

    };

    const getAll = async (req, res) => {
        try {
            const sprints = await Sprint.findAll();

            return res.status(200).json({ sprints });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    };
    

  const getByFilter = async (req, res) => {
    try {
      const { projectId, name } = req.query;
      var conditions = {};
      
      if(projectId)
        conditions.projectId = projectId;
      if(name)
        conditions.name = name;

      const sprints = await Sprint.findAll({
        where: conditions,
      });
      
      return res.status(200).json({ sprints });

    } 
    catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


    return {
        createSprint,
        getAll,
        getByFilter
    };
};

module.exports = SprintController;