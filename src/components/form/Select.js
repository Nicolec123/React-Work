import styles from './Select.module.css';
function Select({ text, name, handleOnChange, value, options }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select
        id={name}
        name={name}
        onChange={handleOnChange}
        value={value || ''}
        required
      >
        <option value=''>Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option?.name || 'Indefinido'}
          </option>
        ))}
      </select>
    </div>
  );
}
export default Select;