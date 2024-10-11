import { useState, useEffect } from 'react';
import styles from './project_form.module.css';
import Input from '../../components/form/Input';
import Select from '../../components/form/Select';
import Submit from '../../components/form/Submit';
function ProjectForm({ btnText, ProjectData, handleSubmit }) {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState(ProjectData || {});
  useEffect(() => {
    fetch('http://localhost:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);
  const submit = (e) => {
    e.preventDefault();
    handleSubmit(projects);
    console.log(projects);
  };
  function handleChange(e) {
    setProjects({
      ...projects,
      [e.target.name]: e.target.value,
    });
  }
  function handleCategory(e) {
    setProjects({
      ...projects,
      categories: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  
    const selectedCategory = e.target.options[e.target.selectedIndex].text.toLowerCase();
    const iconElement = document.getElementById('category-icon');
    iconElement.className = ''; // Limpa classes anteriores
    iconElement.classList.add(`category_text`, `${selectedCategory}`);
  }
  
  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do Projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={projects?.name || ''}
      />
      <Input
        type="number"
        text="Valor do Projeto"
        name="budget"
        placeholder="Insira o valor do projeto"
        handleOnChange={handleChange}
        value={projects?.budget || ''}
      />
      <Select
        name="category_id"
        text="Selecione uma Categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={projects?.categories?.id || ''}
      />
      <Submit text={btnText} />
    </form>
  );
}
export default ProjectForm;