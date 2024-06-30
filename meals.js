import moment from 'moment'

// MEALS

var meals = [
];

class Meal {
    constructor(id, name, date, ingredients) {
        this.id = id;
        this.date = date;
        this.ingredients = ingredients;
        this.name = name
    }
    totalCals() {
        var total = 0
        for (let ing of this.ingredients) {
            total += ing.getCals()
        }
        return total
    }
}





function generateId() {
    if (meals.length > 0) {
        return meals[meals.length - 1].id + 1;
    } else {
        return 1;
    }
}

function isValidDateFormat(date) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(date);
}

function createNewMeal(name, date, ingredients) {
    if (!isValidDateFormat(date)) {
        throw new Error('Error: date format is dd/mm/yyyy');
    }
    const dateFormatted = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const newMeal = new Meal(generateId(), name, dateFormatted, ingredients);
    for (let meal of meals) {
        if (newMeal.name == meal.name && meal.date == newMeal.date) {
            return null
        }
    }

    meals.push(newMeal);

    // for (let existingDate of datesInfo) {
    //     console.log(moment(existingDate))
    //     console.log(moment(newMeal.date))
    //     console.log(moment(existingDate).diff(moment(newMeal.date))  == 0)
    //     if (moment(existingDate).diff(moment(newMeal.date))  == 0) {
    //         addMeal(newMeal.date, newMeal)
    //     } else {
    //         createDay(newMeal.date)
    //         addMeal(newMeal.date, newMeal)
    //     }
    // }
    return newMeal;
}

// pass in meals array
function sortMeals(meals) {
    let sortedMeals = meals.slice();
    for (let i = 0; i < sortedMeals.length - 1; i++) {
        for (let j = i + 1; j < sortedMeals.length; j++) {
            let date1 = new Date(sortedMeals[i].date);
            let date2 = new Date(sortedMeals[j].date);
            if (date1.getTime() > date2.getTime() || datesInfo.getIndex(date1.name) > datesInfo.getIndex(date2.name)) {
                let temp = sortedMeals[i];
                sortedMeals[i] = sortedMeals[j];
                sortedMeals[j] = temp;
            }
        }
    }

    return sortedMeals;
}


// DATES


function checkDate(date) {
    const error1 = "Error: date format is dd/mm/yyyy";
    const error2 = "Error: Invalid date";

    if (!isValidDateFormat(date)) {
        return error1;
    }

    const dateFormatted1 = moment(date, 'DD/MM/YYYY').format('MM/DD/YYYY');
    if (!Date.parse(dateFormatted1)) {
        return error2;
    }

    return true;
}

function datesEqual(d1, d2) {
    if (!(d1.getTime() < d2.getTime()) && !(d2.getTime() > d1.getTime())) {
        return true
    }
    return false
}

function createDay(date) {
    const validation = checkDate(date);
    if (validation !== true) {
        throw new Error(validation);
    }

    const dateFormatted2 = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    // console.log(dateFormatted);
    const newDate = new Date(dateFormatted2);

    let existingDate = datesInfo.find(info => info.date.getTime() === newDate.getTime());

    if (!existingDate) {
        const info = new DatesClass(newDate, []);
        datesInfo.push(info);
    }
    return datesInfo;
}

function addMeal(date, meals) {
    const validation = checkDate(date);
    if (validation !== true) {
        throw new Error(validation);
    }

    const dateFormatted2 = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const newDate = new Date(dateFormatted2);

    let existingDate = datesInfo.find(info => info.date.getTime() === newDate.getTime());

    if (!existingDate) {
        throw new Error('Error: Date not found');
    } else {
        existingDate.meals.push(meals);
    }
    return datesInfo;
}

function getMeal(id) {
    for (let meal of meals) {
        if (meal.id == id) {
            return meal
        }
    }
    return null
}



function editMeal(id, name=null, ingredients=null) {
    var meal = getMeal(id)
    if (name != null) {
        meal.name = name
    } 
    if (ingredients != null) {
        for (let ing of Object.keys(ingredients)) {
            const serves = ingredients[ing]
            for (let mealIng of meal.ingredients) {
                const mealItem = mealIng.item
                if (mealItem.Name == ing) {
                    mealIng.serves = serves
                }
            }
        }
    }
    console.log(meal)
}



function deleteMeal(id) {

    for (let i = 0; i < meals.length; i++) {
        const meal = meals[i]
        if (meal.id == id) {
            meals.splice(i, 1)
            return
        }
    }
}

function getIngredient(name) {
    for (let ing of INGREDIENTS) {
        if (ing.Name == name) {
            return ing
        }
    }
    return null
}

function addIngredientToMeal(id, name, serves) {
    var meal = getMeal(id)
    var ing = new Ingredient(getIngredient(name), serves)
    meal.ingredients.push(ing)
}

function deleteIngredientFromMeal(id, name) {
    var meal = getMeal(id)

    for (let i = 0; i < meal.ingredients.length; i++) {
        const ing = meal.ingredients[i]
        if (ing.item.Name == name) {
            meal.ingredients.splice(i, 1)
            return
        }
    }
}




function totalCalories(date) {
    const validation = checkDate(date);
    if (validation !== true) {
        throw new Error(validation);
    }
    const dateFormatted2 = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const newDate = new Date(dateFormatted2);

    let existingDate = datesInfo.find(info => info.date.getTime() === newDate.getTime());
    
    if (!existingDate) {
        throw new Error('Error: Date not found');
    }

    let totalCal = 0;
    existingDate.meals.forEach(mealName => {
        let meal = meals.find(element => element.name === mealName);
        if (meal) {
            meal.ingredients.forEach(ingredientName => {
                let ingredient = ingredientsList.find(element => element.name === ingredientName);
                if (ingredient) {
                    totalCal = totalCal + ingredient.totalCalories;
                    // // call the serves to calories function
                    // totalCal = totalCal + servesToCalories();
                }
            })
        }
    })
}

var ingredientsList = [];

class Ingredient {
    constructor(item, serves) {
        this.item = item
        this.serves = serves
    }
    getCals() {
        return this.item["CPS"] * this.serves
    }
}

var datesInfo = [];

class DatesClass {
    constructor(date, meals) {
        this.date = date;
        this.meals = meals;
    }
    dailyCals() {
        var total = 0
        for (let meal of this.meals) {
            total += meal.totalCals()
        }
        return total
    }
}

const ALL_INGS = ["chicken", "rice", "broccoli", "avocado", "noodles", "ramen", "oats", "milk", "sausage", "carrots", "tomatos", "onions", "cucumber", "mushroom"]
const ALL_MEALS = ["Breakfast", "Lunch", "Dinner", "Tea"]
const INGREDIENTS = [{"Name": "Brown Lentils", "CPS": 100}, {"Name": "Red Lentils", "CPS": 100}, {"Name": "Green Lentils", "CPS": 100}, {"Name": "Yellow Lentils", "CPS": 100}, {"Name": "Mixed Lentils", "CPS": 100}, {"Name": "Banana", "CPS": 75}, {"Name": "Apple", "CPS": 75}, {"Name": "Orange", "CPS": 75}, {"Name": "Cucumber", "CPS": 25}, {"Name": "Tomato", "CPS": 40}, {"Name": "Sweet Potato", "CPS": 300}, {"Name": "Chicken Breast", "CPS": 150},{"Name": "Steak", "CPS": 150}, {"Name": "Sausage", "CPS": 150}, {"Name": "Chicken Schinztel", "CPS": 160}, {"Name": "Pork belly", "CPS": 150}, {"Name": "Milk", "CPS": 80}, {"Name": "Yoghurt", "CPS": 90}, {"Name": "Almonds", "CPS": 180}, {"Name": "Walnuts", "CPS": 180}, {"Name": "Pistacios", "CPS": 180}, {"Name": "Mixed nuts", "CPS": 180}]

// const ingredients = ['chicken', 'rice', 'broccoli'];
// const ingredients2 = ['chicken', 'rice', 'hi'];

for (let i = 1; i < 31; i++) {
    var input = i
    if (i < 10) {
        input = "0" + i
    }
    createDay(input + "/06/2024")
}

for (let i = 0; i < 100; i++) {
    const n = Math.random() * 5
    var ingredients = []
    for (let j = 0; j < n; j++) {
        const k = Math.floor(Math.random() * INGREDIENTS.length)
        const serves = Math.floor(Math.random() * 5)
        var existingIng = false
        for (let ing of ingredients) {
            if (ing.Name == INGREDIENTS[k]) {
                existingIng = true
                break
            }
        }
        if (!existingIng) {
            ingredients.push(new Ingredient(INGREDIENTS[k], serves))
        }
    }
    var day = Math.ceil(Math.random() * 30)
    if (day < 10) {
        day = "0" + day
    }
    var mealName = ALL_MEALS[Math.floor(Math.random() * ALL_MEALS.length)]
    var meal = createNewMeal(mealName, day + "/06/2024", ingredients)
    if (meal != null) {
        addMeal(day + "/06/2024", meal)
    }
}

// var meal = getMeal(1)
// console.log(meal)
// addIngredientToMeal(1, "Banana", 5)
// console.log(meal)
// var meal = getMeal(1)
// // console.log(meal)
// console.log(meals.includes(meal))
// deleteMeal(1)
// console.log(meals.includes(meal))

// var meal = getMeal(1)
// console.log(meal)
// var ingName = meal.ingredients[0].item.Name
// var ingObj = {[ingName]: 4}
// console.log(ingObj)
// editMeal(1, "Breakfast1", ingObj)




// INGREDIENTS 


export default {"sortMeals": sortMeals, "createNewMeal": createNewMeal, "meals": meals, "Meal": Meal, "createDay": createDay, "addMeal": addMeal, "totalCalories": totalCalories, "datesInfo": datesInfo, "ingredientsList": ingredientsList, "editMeal": editMeal, "getMeal": getMeal, "INGREDIENTS": INGREDIENTS} 


