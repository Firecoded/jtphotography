import "./App.css";
import Gallery from "./components/PhotoGallery";
import logoAlt from "./assets/logo-alt.png";

function App() {
    return (
        <div className="container">
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={logoAlt} alt="JDT Logo" style={{ height: "40px" }} />
                    </a>
                </div>
            </nav>

            <div className="my-5"></div>

            <Gallery />
            <div className="my-5"></div>
        </div>
    );
}

export default App;
