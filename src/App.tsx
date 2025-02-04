import "./App.css";
import Gallery from "./Gallery";
import logoAlt from "./assets/logo-shoots.png";

function App() {
    return (
        <div className="container">
            <nav className="navbar bg-body-tertiary p-0 mt-1">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={logoAlt} alt="Jacobshoots.pictures Logo" style={{ height: "55px" }} />
                    </a>
                </div>
            </nav>

            <div className="my-4"></div>

            <Gallery />
            <div className="my-5"></div>
        </div>
    );
}

export default App;
