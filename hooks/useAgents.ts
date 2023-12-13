import OpenAI from "openai"
import {
  ChatCompletionMessageParam,
  ChatCompletionCreateParams,
} from "openai/resources/index.mjs"

export const useAgents = () => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  const nutritionAgent = async (mealData: any[]) => {
    // Format the meal data into a string
    const formattedMealData = mealData
      .map(
        (meal) =>
          `- Restaurant: ${meal.restaurant}\n  Order Item: ${meal.order_item_name}\n  Category: ${meal.order_category.category}, Sub-Category: ${meal.order_category.sub_category}\n  Amount Paid: ${meal.amount_paid}`
      )
      .join("\n\n")

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `You are a virtual nutritionist with extensive knowledge of food nutrition, dietary needs, and health recommendations. Analyze given food data, including information about the restaurant, the order item, category, and amount paid. Provide insights on nutritional value, dietary needs, diet balancing, potential deficiencies or excesses, and healthy eating tips or alternatives. Here is the data for analysis:`,
      },
      {
        role: "user",
        content: `${formattedMealData}`,
      },
    ]

    const chatCompletion: ChatCompletionCreateParams = {
      model: "gpt-3.5-turbo",
      messages: messages,
    }

    const response = await openai.chat.completions.create(chatCompletion)
    console.log(response.choices[0])
    return response.choices[0]
  }

  return {
    nutritionAgent,
  }
}
