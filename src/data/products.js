// src/data/products.js

import redapple from "../assets/redapple-img.png";
import broccoli from "../assets/broccoli-img.png";
import milkbottle from "../assets/milkbottle-img.jpeg";
import orangejuice from "../assets/orangejuice-img.jpeg";
import orange from "../assets/orange-img.jpeg";
import cabbage from "../assets/cabbage-img.png";
import carrot from "../assets/carrot-img.jpeg";
import curd from "../assets/curd-img.jpeg";
import cheese from "../assets/cheese-img.jpeg";
import applejuice from "../assets/applejuice-img.jpeg";
import mangojuice from "../assets/mangojuice-img.jpeg";

export const products = [
  {
    id: 1,
    name: "Red Apple",
    price: 5.99,
    description:
      "Fresh and juicy red apples directly sourced from local farmers.",
    category: "Fruits",
    image: redapple,
    images: [redapple, redapple, redapple],
  },
  {
    id: 2,
    name: "Broccoli",
    price: 7.99,
    description: "Healthy green broccoli packed with essential nutrients.",
    category: "Vegetables",
    image: broccoli,
    images: [broccoli, broccoli, broccoli],
  },
  {
    id: 3,
    name: "Milk Bottle",
    price: 5.0,
    description: "Pure dairy milk, hygienically packed and farm fresh.",
    category: "Dairy",
    image: milkbottle,
    images: [milkbottle, milkbottle, milkbottle],
  },
  {
    id: 4,
    name: "Orange Juice",
    price: 4.99,
    description: "Refreshing orange juice with no added preservatives.",
    category: "Beverages",
    image: orangejuice,
    images: [orangejuice, orangejuice, orangejuice],
  },
  {
    id: 5,
    name: "Orange",
    price: 4.99,
    description: "Sweet and tangy oranges rich in vitamin C.",
    category: "Fruits",
    image: orange,
    images: [orange, orange, orange],
  },
  {
    id: 6,
    name: "Cabbage",
    price: 3.49,
    description: "Fresh green cabbage rich in fiber and vitamins.",
    category: "Vegetables",
    image: cabbage,
    images: [cabbage, cabbage, cabbage],
  },
  {
    id: 7,
    name: "Carrot",
    price: 2.99,
    description: "Crunchy carrots great for salads and cooking.",
    category: "Vegetables",
    image: carrot,
    images: [carrot, carrot, carrot],
  },
  {
    id: 8,
    name: "Curd",
    price: 2.49,
    description: "Thick and creamy curd made from fresh milk.",
    category: "Dairy",
    image: curd,
    images: [curd, curd, curd],
  },
  {
    id: 9,
    name: "Cheese Block",
    price: 6.99,
    description: "Rich and creamy cheese perfect for sandwiches.",
    category: "Dairy",
    image: cheese,
    images: [cheese, cheese, cheese],
  },
  {
    id: 10,
    name: "Apple Juice",
    price: 4.49,
    description: "Refreshing apple juice with no added sugar.",
    category: "Beverages",
    image: applejuice,
    images: [applejuice, applejuice, applejuice],
  },
  {
    id: 11,
    name: "Mango Juice",
    price: 4.99,
    description: "Sweet mango juice made from ripe mangoes.",
    category: "Beverages",
    image: mangojuice,
    images: [mangojuice, mangojuice, mangojuice],
  },
];
