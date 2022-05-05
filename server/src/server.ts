import Test from './wordController'
import express, { Request, response, Response, Router } from 'express'
import path from 'path'
import cors from 'cors'
import { json } from 'body-parser'

const pathBuild: string = path.join(__dirname + '/../dist')
const app = express()
const mw = json()
const port: String = process.env.PORT || '8081'
const list: string[] = ['table', 'cable', 'sneak', 'kitty', 'paper', 'alert', 'glass', 'world', 'abuse', 'beach', 'cross', 'drama', 'enemy', 'entry', 'field', 'green', 'layer', 'music', 'novel', 'nurse', 'phone']

function getRnd() {
	const l = list.length
	let n = Math.random() * 20
	n = Math.round(n % l)
	console.log("n is: ", n, " word is: ", list[n])
	return list[n]
}
let word = getRnd()

app.use(cors())
app.set('etag', false)
app.disable('view cache')
app.use(express.static(pathBuild, { cacheControl: true, setHeaders: (res: Response) => {
		res.set('Cache-Control', 'no-store')
} }))

app.get('/api/random/:word', mw, (req: Request, res: Response) => {
	console.log(req.params.word)
	res.send(Test(word, req.params.word))
})
app.get('/api/refresh', mw, (req: Request, res: Response) => {
	word = getRnd()
})

app.listen(port, () => {
	console.log(`Listening on port: http://localhost:${port}`)
})