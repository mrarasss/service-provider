const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const utils = require("./utils");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/sample-requests", async (req, res) => {
    const { services } = req.body;

    if(!services || !services.length) {
        return res.status(400).send({
            error: true,
            message:"Request body does not have services!",
        });
    }

    const sampleServiceRequests = utils.generateSampleServiceRequests(services)

    return res.status(200).send({
        error: false,
        sampleServiceRequests,
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});
