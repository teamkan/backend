const Sprint = require('../models/Sprint');

const SprintController = () => {
    const createSprint = async (req, res) => {
        const { body } = req;

        // POTREBNO JE PREVERITI ŠE PREKRIVANJE DATUMOV PROJEKTOV - kako naj tukaj pridobim seznam vseh sprintov? Spodaj je ideja:
        //const sprints = this.getAll()

        if (!body.startdate || !body.enddate || !body.speed) {
            return res.status(400).json({ msg: 'Bad Request: Sprint information incomplete' });
        }

        // PREVERI ZAÈETNI IN KONÈNI DATUM TER HITROST
        if (body.name) {
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

        return res.status(400).json({ msg: 'Bad Request: incorrect date selection' });
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