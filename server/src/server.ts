import Test from './wordController'
import express, { Request, response, Response, Router } from 'express'
import path from 'path'
import cors from 'cors'
import { json } from 'body-parser'
import fs from 'fs'
import Words from './data.json'

const pathBuild: string = path.join(__dirname + '/../dist')
const app = express()
const mw = json()
const port: String = process.env.PORT || '8081'
const list: string[] = Words.words
let ai: number = Words.activeIdx



function getRnd() {
	const l = list.length
	console.log("lenght is: ", l)
	let n = Math.random() * 20
	n = Math.round(n % l)
	console.log("n is: ", n, " word is: ", list[n])
	return list[n]
}
function getWord() {
	console.log("active word is: ", list[ai])
	return list[ai]
}
let word = getWord()

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
	ai += 1
	ai = ai % 20
	word = getWord()
	res.send()
	// let data: any = fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
	// 	if(err) console.log(err)
	// 	let newData: any = JSON.parse(data)
	// 	newData.activeIdx += 1
	// 	fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(newData), (err) => {
	// 		if(err) console.error(err)
	// 	})
	// })
})

app.listen(port, () => {
	console.log(`Listening on port: http://localhost:${port}`)
})