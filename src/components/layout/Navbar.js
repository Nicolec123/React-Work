import { Link } from 'react-router-dom';
import Container from './Container';
import styles from './Navbar.module.css';
import logo from '../../img/costs_logo.png';
function Navbar() {
    return (
        <nav className = {styles.navbar}>
            <Container>
                <div className = {styles.logoNav}>
                <Link to="/"><img src={logo}  alt="Costs"/></Link>
                </div>
                <ul className = {styles.list}>
               <li> 
                <Link to="/">Home</Link>
               </li> 
               <li> 
                <Link to="/Projects">Meus Projetos</Link>
               </li>
               <li> 
                <Link to="/NewProject">Novo Projeto!</Link>
                </li> 
                <li> 
                <Link to="/Empresa">Empresa</Link>
                </li> 
                <li> 
                <Link to="/Contato">Contato</Link>
                </li> 
                </ul>
            </Container>
        </nav>
    );
}

export default Navbar;




























