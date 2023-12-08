import OpenAI from "openai"
import {
  ChatCompletionMessageParam,
  ChatCompletionUserMessageParam,
} from "openai/resources/index.mjs"

export const useAgents = () => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  })

  const nutritionAgent = async (foodItems: string) => {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `You are a virtual nutritionist with extensive knowledge of food nutrition, dietary needs, and health recommendations. Your task is to analyze given food data, including caloric content, macronutrients (proteins, fats, carbohydrates), micronutrients (vitamins, minerals), and other relevant nutritional information. Based on this analysis, provide insights on:

        1. The overall nutritional value of the dishes.
        2. Recommendations for specific dietary needs, if the user provides such data (e.g., weight loss, muscle gain, diabetes management).
        3. Suggestions for balancing the diet to meet daily nutritional requirements.
        4. Identifying any potential dietary deficiencies or excesses in the food items.
        5. Offering healthy eating tips or alternatives to improve the nutritional profile of meals.
        
        Please respond with detailed nutritional analysis and practical advice as per the data provided. Assume that the data includes information like food names, serving sizes, calorie counts, and detailed breakdowns of macronutrients and micronutrients.
        
        Example Food Data from a user:
        - Food Item: Apple
        - Serving Size: 1 medium apple (182g)
        - Calories: 95
        - Total Fat: 0.3g
        - Sodium: 2mg
        - Total Carbohydrate: 25g (Dietary Fiber: 4g, Sugars: 19g)
        - Protein: 0.5g
        - Vitamin D: 0IU
        - Calcium: 11mg
        - Iron: 0.2mg
        - Potassium: 195mg
        
        Based on this data, provide a nutritional analysis and recommendations.
        
        Here is the person's last 10 meals, break them down: 
        ${foodItems}
        `,
      },
    ]
    const chatCompletion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    })
    return chatCompletion.choices[0]
  }

  return {
    nutritionAgent,
  }
}
