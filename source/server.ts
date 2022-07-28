import dotenv from "dotenv";

import app from "./app.js";

dotenv.config();

const port = +process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Mode: ${process.env.MODE || "DEV"}`);
    console.log(`Server is up and runing on port ${port}`);
});