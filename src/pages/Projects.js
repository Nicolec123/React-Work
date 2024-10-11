import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from "./Projects.module.css";
import Container from "../components/layout/Container";
import LinkButton from "../components/layout/LinkButton";
import ProjectCard from "../components/project/ProjectCard";
import Mensagem from "../components/layout/Mensagem";
import Loading from '../components/layout/Loading';
function Projects() {
  const [projects, setProjects] = useState([]);
  const [removerLoading, setRemoverLoading] = useState(false); // Variável para controlar o loading
  const [projectMessage, setProjectMessage] = useState(""); // Correção do nome da variável
  const location = useLocation();
  let message = location.state?.message || ''; // Capturando a mensagem, se houver
  useEffect(() => {
    setTimeout(() => {
      // Chamada à API para carregar os projetos
      fetch('http://localhost:5000/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setProjects(data); // Atualiza o state com os projetos recebidos
          setRemoverLoading(true); // Desativa o loading quando os projetos são carregados
        })
        .catch(error => {
          console.error('Erro ao carregar os projetos:', error);
        });
    }, 300);
  }, []);
  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id));
        setProjectMessage('Projeto removido com sucesso');
      })
      .catch(error => console.log(error)); // Correção de .catch
  }
  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos!</h1>
        <LinkButton to="/NewProject" text="Criar Projeto" />
      </div>
      {message && <Mensagem type="success" msg={message} />} {/* Exibe a mensagem, se houver */}
      {projectMessage && <Mensagem type="success" msg={projectMessage} />} {/* Exibe a mensagem, se houver */}
      <Container customClass="start">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              name={project.name}
              id={project.id}
              budget={project.budget}
              category={project.category?.name || 'Sem categoria'} // Usando optional chaining para evitar erros
              handleRemove={removeProject} // Função para remover o projeto
            />
          ))
        ) : (
          <p>Não há projetos cadastrados.</p>
        )}
        {!removerLoading && <Loading />} {/* Exibe o loading, se estiver ativado */}
        {removerLoading && projects.length === 0 && (
          <p>Todos os projetos foram excluídos.</p>
        )}
      </Container>
    </div>
  );
}
export default Projects;