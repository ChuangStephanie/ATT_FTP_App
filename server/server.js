const express = require("express");
const fs = require("fs");
const xml2js = require("xml2js");
const axios = require("axios");

const app = express();
app.use(express.json());

const url = "https://interfacetst.genco.com:7004/reflashIB";

app.post("/upload-xml", async(req, res) => {
    const xmldata = req.body.xml;

    const parsed = await xml2js.parseStringPromise(xmldata);

    const unit = parsed.RELASH.UNIT[0];

     const payload = {
            Reflash: {
                Header: {
                    Account: "Group O"
                },
                Unit: {
                    Esn: unit.ESN[0],
                    Timestamp: unit.TIMESTAMP[0],
                    Result: unit.RESULT[0],
                    SoftwareName: unit.SOFTWARE_NAME[0],
                    SoftwareVer: unit.SOFTWARE_VER[0],
                    OemName: unit.OEM_NAME[0]
                }
            }
        };
})