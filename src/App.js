import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Empresa from './pages/Empresa';
import Contato from './pages/Contato';
import NewProject from './pages/NewProject';
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Projects from './pages/Projects';
import Project from './pages/Project';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Container customClass="min-height">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Contato" element={<Contato />} />
                        <Route path="/Empresa" element={<Empresa />} />
                        <Route path="/Projects" element={<Projects />} />
                        <Route path="/NewProject" element={<NewProject />} />
                        <Route path="/Project/:id" element={<Project />} />
                    </Routes>
                </Container>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
