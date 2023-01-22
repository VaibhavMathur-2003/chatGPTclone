const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require("body-parser");
const cors = require("cors")
const express = require("express")

const app = express();
app.use(bodyParser.json())
app.use(cors());

const configuration = new Configuration({
    organization: "org-12R9xlOAbNA4EoljuGpGNZwN",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();


app.post('/', async(req, res)=>{
  const {message} = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        temperature: 0.5,
        max_tokens: 100,
      });
      res.json({
        message: response.data.choices[0].text,
      })

})


app.listen(3080,()=>{
    console.log("server started")
})