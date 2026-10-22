export default function About() {
    return (
        <div className="about-page">
            <h1>About MARTA</h1>

            <p>
                MARTA (Metropolitan Atlanta Rapid Transit Authority)
                provides public transportation throughout the Atlanta area.
            </p>

            <h2>MARTA Rail System</h2>

            <p>
                MARTA operates four rail lines: Gold, Red, Blue, and Green.
                Use this website to explore train arrivals and stations for each line.
            </p>

            <iframe
                src="/marta-map.pdf"
                title="MARTA Rail System Map"
                className="marta-map"
                style={{ height: "650px", border: "none" }}
            />

            <p>
                Visit the{" "}
                <a
                    href="https://www.itsmarta.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    official MARTA website
                </a>{" "}
                for additional information.
            </p>
        </div>
    )
}