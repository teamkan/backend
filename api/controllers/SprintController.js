const Sprint = require('../models/Sprint');

const SprintController = () => {
    const createSprint = async (req, res) => {
        const { body } = req;

        try {
            const sprints = await Sprint.findAll();
            let currentDate = new Date();

            if (body.startdate > body.enddate || body.startdate < currentDate || body.enddate < currentDate) {
                return res.status(400).json({ msg: 'Bad Request: invalid Sprint dates' });
            }

            for (var date in sprints) {
                if (date.startdate <= body.startdate && date.enddate >= body.enddate) {
                    return res.status(400).json({ msg: 'Bad Request: selected dates overlap with existing Sprint' });
                }
                else if (date.startdate >= body.startdate && date.enddate <= body.enddate) {
                    return res.status(400).json({ msg: 'Bad Request: selected dates overlap with existing Sprint' });
                }
            }

            if (body.name && !isNaN(body.speed) && body.speed > 0) {
                try {
                    const sprint = await Sprint.create({
                        sprintname: body.sprintname,
                        startdate: body.startdate,
                        enddate: body.enddate,
                        speed: body.speed
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


    return {
        createSprint,
        getAll,
    };
};

module.exports = SprintController;