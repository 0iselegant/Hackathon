
export var meals = [
];

export class Meal {
    constructor(id, date, ingredients) {
        this.id = id;
        this.date = date;
        this.ingredients = ingredients;
        this.name = `Meal ${id}`
    }
}