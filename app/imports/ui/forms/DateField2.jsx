import React from 'react';
import classnames from 'classnames';
import { connectField } from 'uniforms';
import { wrapField } from 'uniforms-bootstrap5';

const DateConstructor = (typeof global === 'object' ? global : window).Date;

function Date({
                disabled,
                error,
                id,
                inputClassName,
                inputRef,
                max,
                min,
                name,
                onChange,
                placeholder,
                readOnly,
                value,
                type,
                ...props
              }) {
  const dateType = type === 'date' ? type : 'datetime-local';
  const dateFormat = type === 'date' ? (v) => v?.toISOString().slice(0, -14) : (v) => v?.toISOString().slice(0, -8);
  return wrapField(
    { ...props, id },
    <input
      className={classnames(inputClassName, 'form-control', {
        'is-invalid': error,
        'is-valid': !error && props.changed,
      })}
      disabled={disabled}
      id={id}
      max={dateFormat(max)}
      min={dateFormat(min)}
      name={name}
      onChange={event => {
        const date = new DateConstructor(event.target.valueAsNumber);
        if (date.getFullYear() < 10000) {
          onChange(date);
        } else if (Number.isNaN(event.target.valueAsNumber)) {
          onChange(undefined);
        }
      }}
      placeholder={placeholder}
      readOnly={readOnly}
      ref={inputRef}
      type={dateType}
      value={dateFormat(value) ?? ''}
    />,
  );
}

export default connectField(Date, { kind: 'leaf' });
