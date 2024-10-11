import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li><Link to="https://github.com/Nicolec123"><FaGithub /></Link></li>
                <li><Link to="https://www.linkedin.com/in/nicole-cruz-a89973202/"><FaFacebook /></Link></li>
                <li><Link to="https://github.com/Nicolec123"><FaGithub /></Link></li>
                <li><Link to="https://www.linkedin.com/in/nicole-cruz-a89973202/"><FaLinkedin /></Link></li>
            </ul>
            <span className={styles.copy_right}>Copyright &copy; 2024</span>
        </footer>
    );
}

export default Footer;
