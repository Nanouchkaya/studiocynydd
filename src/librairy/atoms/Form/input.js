import PropTypes from "prop-types";
import { useFormContext } from 'react-hook-form';

export const Input = ({
  name,
  label,
  type,
  placeholder,
  required = false,
}) => {
  const { register } = useFormContext();

  return (  
    <div className="form-group">
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        className="form-input"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder} 
        ref={register({ required })}
      />
    </div>
    )
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
}
