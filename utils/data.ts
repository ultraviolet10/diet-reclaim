export const mockMealData = [
  {
    restaurant: "Chinese Wok",
    order_item_name: "Veg Hakka Noodles",
    order_category: {
      category: "Rice & Noodles",
      sub_category: "Noodles - Veg",
    },
    amount_paid: 1786,
  },
  {
    restaurant: "Mumbai Masala",
    order_item_name: "Butter Chicken",
    order_category: {
      category: "Main Course",
      sub_category: "Chicken - Non-Veg",
    },
    amount_paid: 2450,
  },
  {
    restaurant: "Italian Bistro",
    order_item_name: "Margherita Pizza",
    order_category: {
      category: "Pizza",
      sub_category: "Vegetarian",
    },
    amount_paid: 1650,
  },
  {
    restaurant: "Tokyo Sushi",
    order_item_name: "Salmon Nigiri",
    order_category: {
      category: "Sushi",
      sub_category: "Fish - Non-Veg",
    },
    amount_paid: 2100,
  },
  {
    restaurant: "Bangkok Street",
    order_item_name: "Pad Thai",
    order_category: {
      category: "Street Food",
      sub_category: "Noodles - Non-Veg",
    },
    amount_paid: 1890,
  },
  {
    restaurant: "Greek Grill",
    order_item_name: "Gyro",
    order_category: {
      category: "Fast Food",
      sub_category: "Meat - Non-Veg",
    },
    amount_paid: 1560,
  },
  {
    restaurant: "The Vegan Corner",
    order_item_name: "Quinoa Salad",
    order_category: {
      category: "Salads",
      sub_category: "Vegan",
    },
    amount_paid: 1380,
  },
  {
    restaurant: "Seoul Kimchi",
    order_item_name: "Bibimbap",
    order_category: {
      category: "Korean Cuisine",
      sub_category: "Mixed",
    },
    amount_paid: 1975,
  },
  {
    restaurant: "El Taco Loco",
    order_item_name: "Chicken Quesadilla",
    order_category: {
      category: "Mexican",
      sub_category: "Non-Veg",
    },
    amount_paid: 1750,
  },
  {
    restaurant: "Parisian Café",
    order_item_name: "Croissant",
    order_category: {
      category: "Bakery",
      sub_category: "Vegetarian",
    },
    amount_paid: 600,
  },
  {
    restaurant: "Cairo Kebab",
    order_item_name: "Lamb Shawarma",
    order_category: {
      category: "Middle Eastern",
      sub_category: "Meat - Non-Veg",
    },
    amount_paid: 2200,
  },
]

// Helper function to parse category JSON
export const parseCategory = (
  categoryJson: string
): { category: string; sub_category: string } => {
  // Assuming the sub_category is not provided in the input, setting a default value
  let category = JSON.parse(categoryJson)
  return {
    category: category.category,
    sub_category: category.sub_category || "Not specified", // Set a default or derive from context
  }
}

// Function to convert the extracted parameters into the desired format
export const convertToDesiredFormat = (extractedParameters: any) => {
  let results = []
  for (let i = 1; extractedParameters[`restaurant_${i}`]; i++) {
    results.push({
      restaurant: extractedParameters[`restaurant_${i}`],
      order_item_name: extractedParameters[`restaurant_${i}_order_item_name`],
      order_category: parseCategory(
        extractedParameters[`restaurant_${i}_order_category`]
      ),
      amount_paid: parseInt(extractedParameters[`res_${i}_amount_paid`], 10),
    })
  }
  return results
}
