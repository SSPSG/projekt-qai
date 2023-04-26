import {Form, Button} from 'react-bootstrap';
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Configuration} from "openai";
import 'bootstrap/dist/css/bootstrap.min.css';

const PARAMS = {
  temperature: 0.5,
  max_tokens: 256,
}

const configuration = new Configuration({
  apiKey:""
})


function App() {
  const [getTopic, setTopic] = useState('')
  const [getResponse, setResponse] = useState('')

  const getPrompt = (topic: any, am_q: any, qm_a: any) => {
    let prompt= 'Udělej quiz na téma ${topic} na ${am_q} otázek a napiš před otázku pak k tomu ${am_a} možné odpovědi a jaká je správná odpověď';
    return prompt;
  }

  const handleSendData = async(e: { preventDefault: () => void; }) => {
    e.preventDefault()
    console.log("submited topic: ", getTopic)
    const prompt = getPrompt(getTopic, 5, 4)
    const url = "https://api.openai.com/v1/engines/text-davinci-003/completions"
    const body = {...PARAMS, prompt}

    const response = await fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${configuration.apiKey}`
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()
    console.log(data)

  }
  return (
    <div>
      <h1>Project QAI</h1>
      <h2>Write a topic of the quiz</h2>
      <Form onSubmit={handleSendData}>
        <Form.Control 
          type="text"
          value = {getTopic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button variant='info' type='submit' className='mt-3' >Submit</Button>
      </Form>
    </div>
  );
}

export default App;
