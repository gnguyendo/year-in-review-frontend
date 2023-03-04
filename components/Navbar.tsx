import Link from 'next/link'
import SearchBar from './Searchbar'

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <h1>League Season in Review</h1>
            </div>
            <Link href="/"> Home</Link>
            <SearchBar/>
        </nav>
    )
}

export default Navbar