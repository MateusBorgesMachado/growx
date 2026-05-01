import express from 'express'
import { envs } from './envs'

const app = express();

app.use(express.json());

app.listen(envs.PORT, () => {
    console.log("API is working in PORT 3000")
})