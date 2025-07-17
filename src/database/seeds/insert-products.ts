import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("products").del();

    // Inserts seed entries
    await knex("products").insert([
        { name: "French Fries", price: 60 },
        { name: "Cheeseburger", price: 80 },
        { name: "Pizza Margherita", price: 100 },
        { name: "Spaghetti Bolognese", price: 90 },
        { name: "Chicken Nuggets", price: 50 },
        { name: "Caesar Salad", price: 70 },
        { name: "Grilled Salmon", price: 130 },
        { name: "Steak", price: 150 },
        { name: "Vegetable Stir Fry", price: 85 },
        { name: "Tacos", price: 60 },
        { name: "Pad Thai", price: 95 },
        { name: "Ramen", price: 90 },
        { name: "Sushi Roll", price: 110 },
        { name: "Hot Dog", price: 55 },
        { name: "Onion Rings", price: 40 },
        { name: "Club Sandwich", price: 75 },
        { name: "Pancakes", price: 65 },
        { name: "Waffles", price: 68 },
        { name: "Ice Cream", price: 45 },
        { name: "Apple Pie", price: 50 }
    ]);
};
