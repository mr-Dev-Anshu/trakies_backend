import { app } from "./app.js";
import dbConnection from "./db/db.connection.js";
const port = process.env.PORT || 9000;
dbConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`App is running on ${port}`);
    });
  })
  .catch(() => {
    console.log("there is some error while connecting the data base  ");
  });