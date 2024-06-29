import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import m from './meals.js'
import moment from 'moment'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs')
app.set('views','./views')

// GLOBALS

var CURR_DATE = "29-06-2024"
//

app.get('/', (req, res) => {
  // console.log(m.datesInfo)
  console.log(req.query['date'])
  var d = null
  for (let date of m.datesInfo) {
    // console.log(date)
    const dateFormatted = moment(req.query.date, 'DD-MM-YYYY').format('YYYY-MM-DD')
    const dateObj = new Date(dateFormatted)
    if (!(dateObj < date.date) && !(dateObj > date.date)) {
      // console.log(date.date)
      d = date
      break
    }
  }
  if (d != null) {
    // console.log(d)
    res.render('index', {"meals" : d.meals})
  }
})

// https://localhost:3000/?date=

app.get('/newMeal', (req, res) => {
  res.render('newMeal')
})

// route for creating a new meal

app.post('/newMeal', (req, res) => {
  m.createNewMeal(new Date(), req.body["ingredients"])
})

app.post('/setDate', (req, res) => {
  
  // CURR_DATE = req.body["new_date"].value
  console.log(req.body["new_date"].value)
  res.redirect('/?date=' + CURR_DATE)
})

// editing the ingredients of a meal

app.post('/editMeal', (req, res) => {
  var edit = {}
  // var meal = m.getMealById(req.query.id)
  // if (req.body["Name"] != meal.name) {
  //   edit["Name"] = req.body["Name"]
  // }
  // for (let igt of Object.keys(req.body["Ingredients"])) {
  //   if (req.body["Ingredients"][igt] != meal.ingredients[igt]) {
  //     edit["Ingredients"][igt] = req.body["Ingredients"][igt]
  //   }
  // }
  
  // m.editMeal(edit)
})

app.post('/deleteMeal', (req, res) => {
  // m.deleteMealById(req.query.id)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// changes