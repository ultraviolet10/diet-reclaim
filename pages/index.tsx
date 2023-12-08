import Image from "next/image"
import { Inter } from "next/font/google"
import { GenerateProof } from "@reclaimprotocol/reclaim-connect-react"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
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
        </div>
      </div>
    </main>
  )
}
