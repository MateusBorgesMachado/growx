import express from 'express'
import { envs } from './envs'
import { Router } from 'express';
import { userRoutes } from './routes/user.routes'
import { authRoutes } from './routes/auth.routes'
import { tweetRoutes } from './routes/tweet.routes'

const app = express();
const route = Router()

app.use(express.json())

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/tweet', tweetRoutes);

app.use(route)

app.listen(envs.PORT, () => {
    console.log("Server open on PORT 3000")
})