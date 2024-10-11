import styles from '../project/ProjectCard.module.css';
import { BsFillTrashFill } from 'react-icons/bs';
function ServiceCard({ id, name, description, cost, handlerRemove }) {
    const remove = (e) => {
        e.preventDefault();
        handlerRemove(id, cost); // Envia o ID e custo do serviço para remoção
    };

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Total:</span> R${cost}
            </p>
            <p>{description}</p>
            <div className={styles.project_card_actions}>
                <button onClick={remove} className={styles.project_card_actions}>
                    <BsFillTrashFill />
                    Excluir
                </button>
            </div>
        </div>
    );
}

export default ServiceCard;