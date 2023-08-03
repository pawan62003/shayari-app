const express = require('express');
const axios = require('axios');
require("dotenv").config()

const app = express();
const port = 3000;

app.use(express.json())

app.get('/shayari', async (req, res) => {
    
    try {
      const keyword = req.query.keyword
      console.log(keyword)
      if(keyword){

    const prompt = `Write a beautiful Shayari about ${keyword} in hindi.`; // The prompt for generating Shayari

    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt,
        max_tokens: 300, // Maximum number of tokens to generate in the response
      },
      {
        headers: {
          Authorization: `Bearer ${ process.env.openaiApiKey}`,
        },
      }
    );

    const shayari = response.data.choices[0].text.trim();
    res.send(shayari);
      }
      else{
        res.send({msg:"please enter the keyword"})
      }
  } catch (error) {
    console.error('Error generating Shayari:', error.message);
    res.status(500).send('Error generating Shayari.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
