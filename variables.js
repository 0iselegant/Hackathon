
export var meals = [];

export class Meal {
    constructor(id, date, ingredients, name, servings) {
        this.id = id;
        this.date = date;
        this.ingredients = ingredients;
        this.name = name;
        this.servings = servings;
    }
}

export var datesInfo = [];

export class DatesClass {
    constructor(date, meals) {
        this.date = date;
        this.meals = meals;
    }
}

export var ingredientsList = [];

export class Ingredients {
    constructor(caloriespergram, totalcalories, name) {
        this.caloriespergram = caloriespergram;
        this.totalcalories = totalcalories;
        this.name = name;
    }
}