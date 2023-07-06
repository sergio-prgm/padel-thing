import { A } from "@solidjs/router";
import { createSignal } from "solid-js";

export default function Home() {
  const [teamA, setTeamA] = createSignal([])
  const [teamB, setTeamB] = createSignal([])

  const searchP = () => {
    const TA = teamA().map(player => player.replaceAll(" ", "_")).join("--")
    const TB = teamB().map(player => player.replaceAll(" ", "_")).join("--")
    console.log(TA)
    console.log(TB)
    return `/game?teams=${encodeURIComponent(TA)}+${encodeURIComponent(TB)}`
  }

  const teamAHandler = (e) => {
    setTeamA(ta => [...ta, e.target.value])
  }

  const teamBHandler = (e) => {
    setTeamB(tb => [...tb, e.target.value])
  }

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl font-medium text-blue-700 uppercase my-16">
        Padel Counter
      </h1>
      <form class="max-w-sm mx-auto">
        <label class="block mb-8 text-xl font-semibold leading-10"> Equipo A
          <input onchange={teamAHandler} class="border font-medium block w-full border-gray-500 px-4 py-2 focus:ring-gray-600 focus:ring-1 focus:outline-none " />
          <input onchange={teamAHandler} class="border font-medium block w-full border-gray-500 px-4 py-2 focus:ring-gray-600 focus:ring-1 focus:outline-none " />
        </label>
        <label class="block mb-8 text-xl font-semibold leading-10"> Equipo B
          <input onchange={teamBHandler} class="border font-medium block w-full border-gray-500 px-4 py-2 focus:ring-gray-600 focus:ring-1 focus:outline-none " />
          <input onchange={teamBHandler} class="border font-medium block w-full border-gray-500 px-4 py-2 focus:ring-gray-600 focus:ring-1 focus:outline-none " />
        </label>
        {/* <A class="font-bold border-2 px-4 py-2 border-blue-500 hover:bg-blue-100 text-2xl">Start Game</A> */}
        <A class="px-6 py-4 font-black text-3xl font-mono bg-blue-800 text-gray-50 hover:bg-blue-900" href={searchP()}>Start!</A>
      </form>
    </main>
  );
}
