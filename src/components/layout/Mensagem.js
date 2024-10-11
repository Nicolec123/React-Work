import styles from './Mensagem.module.css';
import { useState, useEffect } from 'react';

function Mensagem({ type, msg }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!msg) {
      setVisible(false); // Se não houver mensagem, esconde a mensagem
      return;
    }

    setVisible(true); // Quando há uma nova mensagem, exibe a mensagem

    // Esconde a mensagem após 3 segundos
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    // Limpa o temporizador se a mensagem mudar antes dos 3 segundos
    return () => clearTimeout(timer);
  }, [msg]);

  return (
    <>
      {visible && (
        <div className={`${styles.mensagem_container} ${styles[type]}`}>
          <p>{msg}</p>
        </div>
      )}
    </>
  );
}

export default Mensagem;
