import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (

        <div className="home">

            {/* HERO */}

            <section className="home-hero">

                <div className="hero-bg-circle circle-one"></div>
                <div className="hero-bg-circle circle-two"></div>
                <div className="hero-bg-circle circle-three"></div>

                <div className="hero-content">

                    <div className="hero-badge">
                        <span>●</span>
                        MADE FOR STUDENTS
                    </div>

                    <h1>
                        Your campus.
                        <span>Your resources. One hub.</span>
                    </h1>

                    <p className="hero-text">
                        A simple campus marketplace where students
                        can sell useful items or donate things they
                        no longer need.
                    </p>

                    <div className="hero-buttons">

                        <button
                            onClick={() => navigate("/items")}
                        >
                            Explore Resources
                            <span>→</span>
                        </button>

                        <button
                            className="hero-secondary"
                            onClick={() => navigate("/add-item")}
                        >
                            List an Item
                        </button>

                    </div>

                    <div className="hero-trust">

                        <div className="trust-avatars">
                            <span>👩🏻</span>
                            <span>👨🏻</span>
                            <span>👩🏽</span>
                            <span>👨🏽</span>
                        </div>

                        <div>
                            <strong>Built for campus life</strong>
                            <small>Share useful things with fellow students</small>
                        </div>

                    </div>

                </div>


                <div className="hero-visual">

                    <div className="hero-glow"></div>

                    <div className="resource-orbit orbit-one"></div>
                    <div className="resource-orbit orbit-two"></div>

                    <div className="floating-card card-one">

                        <div className="floating-icon">
                            📚
                        </div>

                        <div>
                            <strong>Textbooks</strong>
                            <small>Sell or donate</small>
                        </div>

                        <span className="card-dot"></span>

                    </div>


                    <div className="floating-card card-two">

                        <div className="floating-icon">
                            🧮
                        </div>

                        <div>
                            <strong>Calculator</strong>
                            <small>₹450 · Good condition</small>
                        </div>

                    </div>


                    <div className="resource-circle">

                        <div className="circle-inner">
                            <span>♻</span>
                            <strong>REUSE</strong>
                        </div>

                    </div>


                    <div className="floating-card card-three">

                        <div className="floating-icon">
                            💻
                        </div>

                        <div>
                            <strong>Electronics</strong>
                            <small>Find on campus</small>
                        </div>

                    </div>


                    <div className="mini-notification">

                        <span>✓</span>

                        <div>
                            <strong>New listing</strong>
                            <small>Added just now</small>
                        </div>

                    </div>

                </div>

            </section>


            {/* QUICK STATS */}

            <section className="home-stats">

                <div className="stat-box">
                    <span>01</span>
                    <strong>SELL</strong>
                    <p>Turn unused items into value.</p>
                </div>

                <div className="stat-box">
                    <span>02</span>
                    <strong>DONATE</strong>
                    <p>Give useful things a second life.</p>
                </div>

                <div className="stat-box">
                    <span>03</span>
                    <strong>DISCOVER</strong>
                    <p>Find what you need nearby.</p>
                </div>

                <div className="stat-box">
                    <span>04</span>
                    <strong>CONNECT</strong>
                    <p>Meet fellow students through resources.</p>
                </div>

            </section>


            {/* SELL / DONATE */}

            <section className="resource-section">

                <div className="section-heading">

                    <p className="section-label">
                        TWO SIMPLE WAYS
                    </p>

                    <h2>
                        Give your resources
                        <span> another purpose.</span>
                    </h2>

                    <p>
                        Whether you want to earn from something you
                        no longer use or simply pass it on, Campus
                        Resource Hub keeps it simple.
                    </p>

                </div>


                <div className="resource-grid">

                    <div className="resource-card sell-card">

                        <div className="resource-card-top">

                            <div className="resource-icon">
                                ₹
                            </div>

                            <span className="resource-number">
                                01
                            </span>

                        </div>

                        <h3>Sell</h3>

                        <p>
                            List items you no longer need and
                            sell them directly to fellow students.
                        </p>

                        <button
                            onClick={() => navigate("/add-item")}
                        >
                            Start Selling →
                        </button>

                    </div>


                    <div className="resource-card donate-card">

                        <div className="resource-card-top">

                            <div className="resource-icon">
                                🎁
                            </div>

                            <span className="resource-number">
                                02
                            </span>

                        </div>

                        <h3>Donate</h3>

                        <p>
                            Give away useful items and help
                            another student who might need them.
                        </p>

                        <button
                            onClick={() => navigate("/add-item")}
                        >
                            Donate an Item →
                        </button>

                    </div>

                </div>

            </section>


            {/* WHY SECTION */}

            <section className="why-section">

                <div className="why-content">

                    <p className="section-label">
                        WHY CAMPUS RESOURCE HUB?
                    </p>

                    <h2>
                        Everything useful,
                        <span> closer to you.</span>
                    </h2>

                    <p>
                        College life comes with books, calculators,
                        electronics, stationery and countless other
                        things. Instead of letting useful items sit
                        unused, keep them moving within your campus
                        community.
                    </p>

                    <button
                        onClick={() => navigate("/items")}
                    >
                        Explore the Marketplace →
                    </button>

                </div>


                <div className="why-grid">

                    <div className="why-card">

                        <span>01</span>

                        <div className="why-icon">
                            🎓
                        </div>

                        <h3>Campus focused</h3>

                        <p>
                            Discover resources shared by
                            fellow students.
                        </p>

                    </div>


                    <div className="why-card">

                        <span>02</span>

                        <div className="why-icon">
                            ⚡
                        </div>

                        <h3>Simple to use</h3>

                        <p>
                            List or find an item in just
                            a few steps.
                        </p>

                    </div>


                    <div className="why-card">

                        <span>03</span>

                        <div className="why-icon">
                            ♻️
                        </div>

                        <h3>Reduce waste</h3>

                        <p>
                            Keep useful resources circulating
                            instead of throwing them away.
                        </p>

                    </div>

                </div>

            </section>


            {/* HOW IT WORKS */}

            <section className="how-section">

                <div className="section-heading">

                    <p className="section-label">
                        HOW IT WORKS
                    </p>

                    <h2>
                        From listing to
                        <span> connection.</span>
                    </h2>

                    <p>
                        Three simple steps are all it takes.
                    </p>

                </div>


                <div className="steps">

                    <div className="step">

                        <div className="step-number">
                            01
                        </div>

                        <div className="step-icon">
                            📝
                        </div>

                        <h3>List an item</h3>

                        <p>
                            Add your item, choose Sell or Donate,
                            and provide a few details.
                        </p>

                    </div>


                    <div className="step-line"></div>


                    <div className="step">

                        <div className="step-number">
                            02
                        </div>

                        <div className="step-icon">
                            🔍
                        </div>

                        <h3>Find a resource</h3>

                        <p>
                            Browse available items and discover
                            something useful.
                        </p>

                    </div>


                    <div className="step-line"></div>


                    <div className="step">

                        <div className="step-number">
                            03
                        </div>

                        <div className="step-icon">
                            🤝
                        </div>

                        <h3>Connect</h3>

                        <p>
                            Send a request and connect with
                            the student who listed it.
                        </p>

                    </div>

                </div>

            </section>


            {/* FINAL CTA */}

            <section className="home-cta">

                <div className="cta-decoration decoration-one"></div>
                <div className="cta-decoration decoration-two"></div>

                <p className="section-label">
                    START SHARING
                </p>

                <h2>
                    Have something
                    <span> useful?</span>
                </h2>

                <p>
                    Someone on your campus might need it.
                </p>

                <div className="cta-buttons">

                    <button
                        onClick={() => navigate("/add-item")}
                    >
                        List Your Item →
                    </button>

                    <button
                        className="cta-secondary"
                        onClick={() => navigate("/items")}
                    >
                        Explore Items
                    </button>

                </div>

            </section>

        </div>
    );
}

export default Home;