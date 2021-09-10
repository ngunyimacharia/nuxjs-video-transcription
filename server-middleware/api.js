import { parse } from "path";
import { generate } from "shortid";

require('dotenv').config()

const app = require('express')()

const express = require('express')

app.use(express.json())

app.all('/gcs-store', async (req, res) => {

    const url = req.body.url;

    const fetch = require('node-fetch');
    const { Storage } = require('@google-cloud/storage');

    const storage = new Storage();
    const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

    // Create unique filename
    const pathname = new URL(url).pathname;
    const { ext } = parse(pathname);
    const shortId = generate();
    const filename = `${shortId}${ext}`;

    // Create a WritableStream from the File
    const file = bucket.file(filename);
    const writeStream = file.createWriteStream();

    fetch(url)
        .then(res => {
            res.body.pipe(writeStream);
        });

    const gcsUrl = file.publicUrl()
        .replace("https://storage.googleapis.com/", "gs://");

    return res.json({ gcsUrl });
})

app.all('/trascribe', async (req, res) => {

    const speech = require('@google-cloud/speech').v1p1beta1;

    // Creates a client
    const client = new speech.SpeechClient();

    const config = {
        languageCode: "en-US",
        enableSpeakerDiarization: true,
    };

    const url = req.body.url;

    console.log(url);

    const audio = {
        uri: url
    };

    const request = {
        config,
        audio,
    };

    // Detects speech in the audio file.
    const [response] = await client.recognize(request);

    return res.json(response);
})

module.exports = app
