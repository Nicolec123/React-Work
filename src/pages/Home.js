import styles from './Home.module.css'
import savings from '../img/savings.svg'
import LinkButton from '../components/layout/LinkButton'
function Home(){
    return(
        <section className={styles.home_container}>
            <h1>Bem-Vindo ao <span>workDN</span></h1>
           <p>Comece a gerenciar os seus projetos agora mesmo!</p>
           <LinkButton to="/NewProject" text="Criar Projeto"/>
            <img src={savings} alt="Costs" />
        </section>
    )
}

export default Home;