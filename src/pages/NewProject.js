import styles from './NewProject.module.css';
import Projectform from '../components/project/project_form';
import { useNavigate } from 'react-router-dom';

function NewProject() {
  const navigate = useNavigate();

  function createPost(project) {
    project.const = 0;
    project.services = [];

    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        navigate('/projects', { state: { message: 'Projeto criado com sucesso!' } });
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar seus serviços</p>
      {/* Passando createPost para handleSubmit */}
      <Projectform handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  );
}

export default NewProject;
