let config = {
    port: 5000,
    heroku: false,
    mongoURI: "mongodb://localhost/blogster",
}

// if (process.env.NODE_ENV === "production") {
//     //for Heroku
//     module.exports = {
//         port: process.env.PORT,
//         mongoURI:
//             'mongodb+srv://alx123:alx123@cluster0-9rpsa.mongodb.net/blogstar?retryWrites=true',
//         heroku: true
//     };

// } else {
//     module.exports = {
//         port: 5000,
//         mongoURI: "mongodb://mongo/blogster",
//         heroku: false
//     };
// }

if (process.env.NODE_ENV === "production") {
    //for Heroku
    config.port = process.env.PORT
    config.mongoURI = 'mongodb+srv://alx123:alx123@cluster0-9rpsa.mongodb.net/blogstar?retryWrites=true'
    config.heroku = true

}

if (process.env.DOCKER_CMP) {
    config.mongoURI = "mongodb://mongo/blogster"
}

module.exports = config