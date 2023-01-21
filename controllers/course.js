const courseModel = require('../models/course');

const dataFinder = (type, req) => {
    switch (type) {
        case "TEXT":
            return {
                text: req.body.text
            }

        case "CARD":
            return {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                rating: req.body.rating,
                totalRatings: req.body.totalRatings,
            }

        default:
            break;
    }
}

const courseController = async (req, res, next) => {
    console.log(req.body, "req body");
    const data = dataFinder(req.body.type, req);

    const course = new courseModel({
        data: data,
        keyword: req.body.keyword,
        type: req.body.type
    })

    const resposne = await course.save()
    if (resposne) {
        res.status(200).send(resposne);
    } else {
        throw new Error(err)
    }
}

module.exports = courseController;