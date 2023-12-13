import Image from "next/image"
import { Inter } from "next/font/google"
import { GenerateProof } from "@reclaimprotocol/reclaim-connect-react"
import { useCallback } from "react"
import { useAgents } from "@/hooks/useAgents"
import { mockMealData } from "@/utils/data"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const { nutritionAgent } = useAgents()

  const handleVerify = useCallback(async () => {
    const getNutritionData = await nutritionAgent(mockMealData)
  }, [nutritionAgent])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="flex flex-col space-y-4 p-10 items-center justify-center">
          <span className="font-white text-[25px]">NourishSmart</span>
          <GenerateProof
            appID="6d6c04eb-237b-4599-8797-94d48b0ac612"
            userID="dasq2easdase-asdq2e3" //optional
            onProofSubmission={(proofs, sessionId) => {
              console.log({ proofs, sessionId })
            }}
            onProofSubmissionFailed={() => {
              console.log("error")
            }}
          ></GenerateProof>
          <button
            className="flex w-[165px] bg-[#35274E] flex-row items-center justify-center rounded-xl py-2 text-center text-base font-medium text-white shadow-sm hover:bg-[#9C4FFF] hover:text-white"
            onClick={handleVerify}
          >
            Verify
          </button>
        </div>
      </div>
    </main>
  )
}
