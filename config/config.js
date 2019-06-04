if (process.env.NODE_ENV === "production") {
    //for Heroku
    module.exports = {
        port: process.env.PORT,
        mongoURI:
            'mongodb+srv://alx123:alx123@cluster0-9rpsa.mongodb.net/blogstar?retryWrites=true'
    };

} else {
    module.exports = {
        port: 5000,
        mongoURI: "mongodb://localhost/blogster-dev"
    };
}