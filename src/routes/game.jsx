import { createEffect, createSignal } from "solid-js";
import { useSearchParams } from "solid-start";

export default function Game() {
  const [searchP, _] = useSearchParams()

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl font-medium text-blue-700 uppercase my-16">
        Padel Counter
      </h1>
      <Score teams={searchP.teams.split(" ")} />
    </main>
  );
}

const pointMap = {
  0: 0,
  1: 15,
  2: 30,
  3: 40
}

function Score({ teams }) {
  const [teamA, teamB] = teams

  const [scoreA, setScoreA] = createSignal(0)
  const [scoreB, setScoreB] = createSignal(0)
  const [result, setResult] = createSignal([0, 0])

  const tennisTranslate = (valueA, valueB) => {
    if (valueA === valueB && valueA >= 3) {
      return "DEUCE"
    } else if (valueA < 4 && valueB < 4) {
      return `${pointMap[valueA]} - ${pointMap[valueB]}`
    } else {
      return valueA > valueB ? "AD - X" : "X - AD"
    }
  }

  const handleClickA = (e) => {
    setScoreA(scoreA() + 1)
  }

  const handleClickB = (e) => {
    setScoreB(scoreB() + 1)
  }

  createEffect(() => {
    if (scoreA() - scoreB() >= 2 && scoreB() >= 3) {
      setScoreA(0)
      setScoreB(0)
      setResult([result()[0] + 1, result()[1]])
      console.log("Player A won!!")
    } else if (scoreB() - scoreA() >= 2 && scoreA() >= 3) {
      setScoreA(0)
      setScoreB(0)
      setResult([result()[0], result()[1] + 1])
      console.log("Player B won!!")
    }
    if (scoreA() === 4 && scoreB() <= 2) {
      setScoreA(0)
      setScoreB(0)
      setResult([result()[0] + 1, result()[1]])
      console.log("Player A won!!")
    } else if (scoreB() === 4 && scoreA() <= 2) {
      setScoreA(0)
      setScoreB(0)
      setResult([result()[0], result()[1] + 1])
      console.log("Player B won!!")
    }
  })

  return (
    <div>
      <div class="flex gap-6 w-fit mx-auto py-6">
        {result().map(v => (
          <span class="px-6 py-4 font-black text-3xl font-mono bg-blue-800 text-gray-50 ">{v}</span>
        ))}</div>

      <div class="flex mx-auto w-fit gap-6">
        <Btn handler={handleClickA}>{teamA || 'Team A'}</Btn>
        <Btn handler={handleClickB}>{teamB || 'Team B'}</Btn>
      </div>

      <div class="block font-bold text-4xl mt-6 font-mono" >{tennisTranslate(scoreA(), scoreB())}</div>
    </div>
  )

}

function Btn({ children, handler }) {
  return <button onclick={handler} class="font-bold border-2 px-4 py-2 border-blue-500 hover:bg-blue-100 text-2xl">{children}</button>
}