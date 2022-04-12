import Test from './wordController'
import express, { Request, response, Response, Router } from 'express'
import path from 'path'
import cors from 'cors'
import { json } from 'body-parser'

const pathBuild: string = path.join(__dirname + '/../../game/dist')
const app = express()
const mw = json()
const port: String = '8081'
const rndWord: string = "table"

app.use(cors())
// app.use(express.static(pathBuild))

app.get('/api/random/:word', mw, (req: Request, res: Response) => {
	console.log(req.params.word)
	res.send(Test(rndWord, req.params.word))
})

app.listen(port, () => {
	console.log(`Listening on port: http://localhost:${port}`)
})