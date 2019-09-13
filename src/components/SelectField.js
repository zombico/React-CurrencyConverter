import React from 'react';

const SelectField = withRouter(props => {
  return (
    <section>
      <label htmlFor={props.htmlFor}>
        {props.label} {props.optionalCopy}
      </label>
      <select
        id={props.id}
        name={props.name}
        onChange={props.onChange}        
        value={props.value}
        disabled={props.disabled}
      >
        {props.options.map((option, index) => (
          
          <option value={option.value} key={index}>
            {option.name}
          </option>
        ))}
      </select>
      
      <span>{props.error}</span>
    </section>
  );
});

export default SelectField;