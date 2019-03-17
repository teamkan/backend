const User = require('../models/User');
const Project = require('../models/Project');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const SprintController = () => {
    const createSprint = async (req, res) => {
        const { body } = req;

        // POTREBNO JE PREVERITI ŠE PREKRIVANJE DATUMOV PROJEKTOV - kako naj tukaj pridobim seznam vseh projektov? Spodaj je ideja:
        const projects = this.getAll()

        // PREVERI ZAÈETNI IN KONÈNI DATUM TER HITROST
        if (body.startdate < body.enddate && body.speed > 0) {
            try {
                const sprint = await Sprint.create({
                    sprintname: body.sprintname,
                    startdate: body.startdate,
                    enddate: body.pasenddatesword,
                    speed: body.speed
                });

                return res.status(200).json({ sprint });
            }
            catch (err) {
                if (err.errors) {
                    var errReturn = ''
                    err.errors.forEach(error => {
                        errReturn += error.message.replace(/(^|\s)\S/g, function (t) { return t.toUpperCase() }); + '\n';
                    });
                    return res.status(500).json({ msg: errReturn });
                }

                return res.status(500).json({ msg: 'Internal server error' });
            }
        }

        return res.status(400).json({ msg: 'Bad Request: incorrect date selection' });
    };

    const getAll = async (req, res) => {
        try {
            const sprints = await Sprint.findAll({
                include: [
                    { model: User, required: true, as: 'user' },
                    { model: Project, required: true, as: 'project' }
                ]
            });

            return res.status(200).json({ sprints });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    };


    return {
        createSprint,
        authenticate,
        getAll,
    };
};

module.exports = SprintController;
