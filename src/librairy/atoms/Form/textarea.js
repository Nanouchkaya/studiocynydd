import PropTypes from "prop-types";
import { useFormContext } from 'react-hook-form';

export const Textarea = ({
  placeholder,
  name,
  label,
  required = false,
}) => {
  const { register } = useFormContext();
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">{label}</label>
      <textarea
        className="form-textarea"
        name={name}
        placeholder={placeholder}
        required={required}
        ref={register}
      />
    </div>
  )
}

Textarea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  columns: PropTypes.number,
  rows: PropTypes.number
}
