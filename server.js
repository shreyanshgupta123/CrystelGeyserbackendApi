const app = require('./app');
const sequelize = require('./config/database');
const config = require('./config/config');

sequelize.sync().then(() => {
    console.log("Database is connected");
    app.listen(config.port, () => {
        console.log(`App running on port ${config.port}.`);
    });
}).catch((err) => {
    console.error("Unable to connect to the database:", err);
});
