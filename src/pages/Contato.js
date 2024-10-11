import styles from './Home.module.css'

function Contato(){
    return(
        <div className={styles.home_container}>
            <h1>Welcome to the Contatos Page!</h1>
            <p>This is the default page for our React App.</p>
            <button>Click Me</button>
        </div>
    )
}

export default Contato;