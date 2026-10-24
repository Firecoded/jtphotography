import "./App.css";
import Gallery from "./components/Gallery";
import Logo from "./components/Logo";

function App() {
    return (
        <>
            <nav className="navbar p-0" style={{ backgroundColor: "#264653" }}>
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <Logo />
                    </a>
                </div>
            </nav>
            <div className="container">
                <div className="my-4"></div>

                <Gallery />
                <div className="my-5"></div>
            </div>
        </>
    );
}

export default App;
