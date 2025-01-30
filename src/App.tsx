import "./App.css";
import Gallery from "./components/PhotoGallery";

function App() {
    return (
        <>
            <div className="container">
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            JTPI
                        </a>
                    </div>
                </nav>
            </div>

            <div>
                <Gallery />
            </div>
        </>
    );
}

export default App;
