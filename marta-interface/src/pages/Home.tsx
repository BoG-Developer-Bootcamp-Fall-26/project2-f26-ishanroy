export default function Home() {
    return (
        <div className="home-page">
            <h1>Welcome to MARTA</h1>
            <p>Explore Atlanta's MARTA train lines and arrival times.</p>

            <h2>Select a Train Line</h2>

            <div className="home-lines">
                <a href="/lines/gold" className="gold-line">Gold Line</a>
                <a href="/lines/red" className="red-line">Red Line</a>
                <a href="/lines/blue" className="blue-line">Blue Line</a>
                <a href="/lines/green" className="green-line">Green Line</a>
            </div>

            <a href="/about">About MARTA</a>
        </div>
    )
}