import Navbar from "../components/Navbar"

export default function Home() {
  return (
    <div>
      <Navbar/>
      <h1>League Review Kinda</h1>
      <form action="/" method="get">
        <label htmlFor="summonername">Summoner Name</label>
        <input type="text" id="summonername" name="summonername" />
        <button type="submit">Submit</button>
      </form>

    </div>
  )
}
