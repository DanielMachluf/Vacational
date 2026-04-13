import "./About.css";

export function About() {
    return (
        <div className="About">
            <div className="about-header">
                <h1>About <span className="brand-name">Vacational</span></h1>
                <p>A smart, interactive way to explore and manage your dream vacations.</p>
            </div>

            <div className="about-content">
                <section className="about-card full-width">
                    <h2>What is Vacational?</h2>
                    <p>
                        Vacational is a full-stack vacation management system built as a school project, designed for users who 
                        want a visually appealing and interactive way to explore travel destinations.
                    </p>
                    <p>
                        The project allows users to browse active and future vacations, manage their personal favorites through a live 
                        like system, and utilize natural language AI to discover new locations or query database analytics. We enforce 
                        clear business rules, like strict role-based access for admins to manage inventory, while providing a seamless 
                        user-friendly experience that guides you via smart interactions.
                    </p>
                </section>

                <div className="about-grid-2">
                    <section className="about-card">
                        <h2>Technologies Used</h2>
                        <ul className="icon-list">
                            <li><span>⚛️</span> React 18 & TypeScript</li>
                            <li><span>🟢</span> Node.js & Express</li>
                            <li><span>🗄️</span> MySQL Database</li>
                            <li><span>🤖</span> OpenAI & MCP Protocol</li>
                            <li><span>📊</span> Recharts Data Viz</li>
                            <li><span>⚡</span> Vite Build Tool</li>
                        </ul>
                    </section>

                    <section className="about-card">
                        <h2>Key Features</h2>
                        <ul className="icon-list">
                            <li><span>🔒</span> Secure JWT Authentication</li>
                            <li><span>❤️</span> Interactive Like System</li>
                            <li><span>📈</span> Admin Reporting & CSV</li>
                            <li><span>🧠</span> Ask AI Travel Assistant</li>
                            <li><span>🔍</span> Natural Language DB Analytics</li>
                            <li><span>📱</span> Responsive Modern UI</li>
                        </ul>
                    </section>
                </div>

                <section className="about-card full-width">
                    <h2>Challenges & Solutions</h2>
                    <p>
                        The main challenge was seamlessly integrating the Model Context Protocol (MCP) and AI capabilities to query 
                        backend SQL schemas naturally. Instead of relying on complex custom BI tools, we implemented an LLM-driven 
                        agent that dynamically comprehends database structures, allowing users to ask complex questions in plain 
                        English and receive instant factual answers.
                    </p>
                </section>

                <section className="about-card full-width">
                    <h2>Future Improvements</h2>
                    <p>
                        With more time, I'd love to add <strong>real-time socket connections</strong> for live like counts, a personal 
                        <strong>booking integration system</strong>, and <strong>automated email confirmations</strong> for upcoming trips.
                    </p>
                </section>

                <section className="about-card developer-card">
                    <div className="developer-info">
                        <div className="dev-header">
                            <span className="dev-subtitle">ABOUT THE DEVELOPER</span>
                            <h2>Daniel Machluf</h2>
                            <p className="dev-title">Full-Stack Student @ John Bryce Academy</p>
                        </div>
                        <p className="dev-bio">
                            Hi, I'm Daniel, 21 years old from Tel Aviv. This project represents my journey into clean 
                            architecture, modern frontend visual design, and robust SQL backend interactions.
                        </p>
                        <a href="https://github.com/danielmachluf" target="_blank" rel="noreferrer" className="btn-github">
                            View on GitHub
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
