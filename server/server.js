const express = require("express");
const multer = require("multer");
const fs = require("fs");
const xml2js = require("xml2js");
const axios = require("axios");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(express.json());

const testUrl = "https://interfacetst.genco.com:7004/reflashIB";
const url = "https://interface.genco.com:7004/reflashIB";

app.post("/upload-xml", upload.single("file"), async (req, res) => {
  try {
    const xmldata = req.file.buffer.toString();

    const parsed = await xml2js.parseStringPromise(xmldata);
    const unit = parsed.RELASH.UNIT[0];

    const payload = {
      Reflash: {
        Header: {
          Account: "Techcess Sollutions",
        },
        Unit: {
          Esn: unit.ESN[0],
          Timestamp: unit.TIMESTAMP[0],
          Result: unit.RESULT[0],
          SoftwareName: unit.SOFTWARE_NAME[0],
          SoftwareVer: unit.SOFTWARE_VER[0],
          OemName: unit.OEM_NAME[0],
        },
      },
    };

    console.log(payload);
    console.log("xml parsed");

    const response = await axios.post(testUrl, payload, {
      auth: {
        username: "reflashUser",
        password: "reflash2fsc^tst",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.json({
      success: true,
      apiResponse: response.data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
