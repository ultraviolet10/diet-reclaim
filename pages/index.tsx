import { Inter } from "next/font/google"
import { GenerateProof } from "@reclaimprotocol/reclaim-connect-react"
import { useCallback, useState } from "react"
import { useAgents } from "@/hooks/useAgents"
import { convertToDesiredFormat, mockMealData } from "@/utils/data"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [proofs, setProofs] = useState<any>()
  const { nutritionAgent } = useAgents()

  const handleVerify = useCallback(async () => {
    const getNutritionData = await nutritionAgent(
      convertToDesiredFormat(proofs)
    )
    console.log(getNutritionData)
  }, [nutritionAgent, proofs])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center ${inter.className}`}
    >
      <div className="flex items-center justify-center h-[90vh] w-[80%] border-[1px] border-white rounded-xl">
        <div className="flex flex-col space-y-10 p-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full space-y-3">
            <span className="font-white text-[25px]">NourishSmart</span>
            <span className="font-white text-[18px]">
              ❤️ a smart nutritionist that cares! ❤️
            </span>
          </div>

          <div className="flex flex-col items-center justify-center w-full space-y-3">
            <span className="font-white text-[18px]">
              click on the button below to attest your food ordering history
            </span>

            <GenerateProof
              appID={process.env.NEXT_PUBLIC_RECLAIM_APP_ID as string}
              userID="" // optional
              onProofSubmission={(proofs) => {
                setProofs(proofs[0].extractedParameterValues)
              }}
              onProofSubmissionFailed={() => {
                console.log("error")
              }}
            ></GenerateProof>
          </div>

          {/* show this button once the proof has been generated */}
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
