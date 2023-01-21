const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    data: {},
    keyword: String,
    type: String,
})

module.exports = mongoose.model("Course", courseSchema);



// data: {
//     name: String,
//     description: String,
//     price: Number,
//     rating: Number,
//     totalRatings: Number,
// },


// class Course {
//     constructor(name, description, price, rating, totalRatings, keyword, type) {
//         this.data = {
//             name: name,
//             description: description,
//             price: price,
//             ratings: rating,
//             totalRatings: totalRatings,
//         };
//         this.keyword = keyword;
//         this.type = type;
//     }


// }