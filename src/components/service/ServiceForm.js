import { useState } from 'react';
import Input from '../form/Input';
import Submit from '../form/Submit';
import styles from '../../components/project/project_form.module.css'; // Certifique-se de que o caminho esteja correto

function ServiceForm({ btnText, handleSubmit, projectData }) {
  const [service, setService] = useState({ name: '', cost: '', description: '' }); // Estado como objeto para os dados do serviço

  function submit(e) {
    e.preventDefault();
    projectData.services = projectData.services || []; // Garante que services exista
    projectData.services.push(service); // Adiciona o serviço ao projeto
    handleSubmit(projectData); // Envia os dados atualizados do projeto
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value }); // Atualiza o serviço com o novo valor
  }

  return (
    <form onSubmit={submit}>
      <Input
        type="text"
        text="Valor"
        name="cost"
        placeholder="Insira o valor total do serviço"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Nome do Serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Escopo do Serviço"
        name="description"
        placeholder="Descreva o serviço que irá prestar..."
        handleOnChange={handleChange}
      />
      <Submit text={btnText} />
    </form>
  );
}

export default ServiceForm;
