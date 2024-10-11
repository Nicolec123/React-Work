import { parse, v4 as uuidv4 } from 'uuid';
import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../components/layout/Loading';
import Container from '../components/layout/Container';
import ProjectForm from '../components/project/project_form';
import Message from '../components/layout/Mensagem';
import ServiceForm from '../components/service/ServiceForm';
import ServiceCard from '../components/service/ServiceCard';

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [services, setServices] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProject(data);
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 1000); // 1 segundo para simular carregamento
  }, [id]);

  function editPost(updatedProject) {
    setMessage('');
    if (updatedProject.budget < updatedProject.cost) {
      setMessage('O orçamento não pode ser menor do que o custo do projeto');
      setType('error');
      return false;
    }

    fetch(`http://localhost:5000/projects/${updatedProject.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProject),
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage('Projeto atualizado!');
        setType('success');
      })
      .catch((err) => console.log(err));
  }

  function createService(project) {
    setMessage('');
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();
    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(project.budget)) {
      setMessage('O orçamento não pode ser ultrapassado. Verifique o valor do serviço.');
      setType('error');
      project.services.pop();
      return false;
    }

    project.cost = newCost;

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setShowServiceForm(false);
        setMessage('Serviço adicionado!');
        setType('success');
      })
      .catch((err) => console.log(err));
  }

  function handleRRemove(serviceId, serviceCost) {
    const updatedServices = project.services.filter(
      (service) => service.id !== serviceId
    );
    const updatedProject = {
      ...project,
      services: updatedServices,
      cost: project.cost - serviceCost, // Atualiza o custo do projeto
    };

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProject),
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setMessage('Serviço removido com sucesso!');
        setType('success');
      })
      .catch((err) => console.log(err));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.details_container}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={styles.form}>
                  <p>
                    <span>Categoria:</span> {project.category?.name}
                  </p>
                  <p>
                    <span>Orçamento:</span> {project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.form}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluído"
                    projectData={project}
                  />
                </div>
              )}
            </div>

            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
              </button>
              {showServiceForm && (
                <div className={styles.form}>
                  <ServiceForm
                    handleSubmit={createService}
                    projectData={project}
                    btnText="Adicionar Serviço"
                  />
                </div>
              )}
            </div>

            <h2>Serviços:</h2>
            <Container customClass="start">
              {services.length > 0 ? (
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id} 
                    handlerRemove={() => handleRRemove(service.id, service.cost)} // Chama a função de remoção
                  />
                ))
              ) : (
                <p>Não há serviços cadastrados.</p>
              )}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
