import { createEffect, createSignal } from "solid-js";
import { useSearchParams } from "solid-start";

export default function Game() {
  const [searchP, _] = useSearchParams()
  // const [teamA, teamB] = searchP.teams.split(" ")

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
  const [playerA1, playerA2] = teamA.split("--").map((p, i) => ({ name: p.replaceAll("_", " "), i: i * 2 }))
  const [playerB1, playerB2] = teamB.split("--").map((p, i) => ({ name: p, i: (i * 2) + 1 }))

  const [scoreA, setScoreA] = createSignal(0)
  const [scoreB, setScoreB] = createSignal(0)
  const [result, setResult] = createSignal([0, 0])
  const [isServing, setIsServing] = createSignal(0)

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

  const server = () => isServing() % 4

  createEffect(() => {
    console.log(server())
    console.log(isServing())
  })

  createEffect(() => {
    if (scoreA() - scoreB() >= 2 && scoreB() >= 3) {
      setScoreA(0)
      setScoreB(0)
      setResult([result()[0] + 1, result()[1]])
      setIsServing(s => ++s)
      console.log("Player A won!!")
    } else if (scoreB() - scoreA() >= 2 && scoreA() >= 3) {
      setScoreA(0)
      setScoreB(0)
      setResult([result()[0], result()[1] + 1])
      setIsServing(s => ++s)
      console.log("Player B won!!")
    }
    if (scoreA() === 4 && scoreB() <= 2) {
      setScoreA(0)
      setScoreB(0)
      setResult([result()[0] + 1, result()[1]])
      setIsServing(s => ++s)
      console.log("Player A won!!")
    } else if (scoreB() === 4 && scoreA() <= 2) {
      setScoreA(0)
      setScoreB(0)
      setResult([result()[0], result()[1] + 1])
      setIsServing(s => ++s)
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
        <Btn handler={handleClickA}>
          <span class="block border-b border-gray-400">{playerA1.name || 'Player A1'}{server() === playerA1.i && '*'}</span>
          <span class="block">{playerA2.name || 'Player A2'}{server() === playerA2.i && '*'}</span>
        </Btn>
        <Btn handler={handleClickB}>
          <span class="block border-b border-gray-400">{playerB1.name || 'Player B1'}{server() === playerB1.i && '*'}</span>
          <span class="block">{playerB2.name || 'Player B2'}{server() === playerB2.i && '*'}</span>
        </Btn>
      </div>

      <div class="block font-bold text-4xl mt-6 font-mono" >{tennisTranslate(scoreA(), scoreB())}</div>
    </div>
  )
}

// function Player({ name, isServing }) {
//   return <span>{name}</span>
// }

function Btn({ children, handler }) {
  return <button onclick={handler} class="font-bold border-2 px-4 py-2 border-blue-500 hover:bg-blue-100 text-2xl">{children}</button>
}