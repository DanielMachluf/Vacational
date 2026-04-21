import "./Hero.css";

export function Hero() {
    return (
        <section className="Hero">
            <div className="hero-content">
                <h1 className="hero-title">
                    Discover Your <span>Dream</span> Vacation
                </h1>
                <p className="hero-subtitle">
                    Explore the world's most breathtaking destinations and create memories that will last a lifetime. Premium getaways curated just for you.
                </p>
                <div className="hero-cta-wrapper">
                    <button className="hero-cta-button" onClick={() => window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' })}>
                        Explore Destinations
                    </button>
                </div>
            </div>
        </section>
    );
}
