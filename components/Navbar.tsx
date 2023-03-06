import Link from 'next/link'
import SearchBar from './Searchbar'

const Navbar = () => {
    return (
        <nav>
            <Link href="/"><h1>League Season in Review</h1></Link>
            <SearchBar/>
        </nav>
    )
}

export default Navbar