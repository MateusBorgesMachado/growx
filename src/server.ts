import express from 'express'
import dotenv from 'dotenv'
import { Router } from 'express'
import { userRoutes } from './routes/user.routes'
import { authRoutes } from './routes/auth.routes'
import { tweetRoutes } from './routes/tweet.routes'
import { followRoutes } from './routes/follow.routes'
import { likeRoutes } from './routes/like.routes'
// import { envs } from './envs'

const app = express()
const route = Router()

app.use(express.json())

app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/tweet', tweetRoutes)
app.use('/follow', followRoutes)
app.use('/like', likeRoutes)

app.use(route)

app.listen(process.env.PORT, () => {
    console.log("Server open on PORT 3000")
})