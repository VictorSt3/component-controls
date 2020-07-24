import React, { ChangeEvent } from 'react';
import { Select } from 'theme-ui';
import styled from '@emotion/styled';
import {
  ComponentControlOptions,
  ControlTypes,
} from '@component-controls/core';
import { normalizeOptions } from './utils';
import { PropertyEditor } from '../types';
import { useControl } from '../state';
import { RadiosEditor } from './RadiosEditor';
import { CheckboxEditor } from './CheckboxEditor';
import { addPropertyEditor } from '../prop-factory';

const OptionsSelect = styled(Select)({
  color: 'black',
  flexBasis: '100%',
});

/**
 * Options control editor.
 */

export const OptionsEditor: PropertyEditor = ({ name, selector, ...rest }) => {
  const [control, onChange] = useControl<ComponentControlOptions>(
    name,
    selector,
  );
  const { display, options, value } = control;

  if (display === 'check' || display === 'inline-check') {
    return <CheckboxEditor name={name} selector={selector} {...rest} />;
  }

  if (display === 'radio' || display === 'inline-radio') {
    return <RadiosEditor name={name} selector={selector} {...rest} />;
  }

  if (
    display === undefined ||
    display === 'select' ||
    display === 'multi-select'
  ) {
    const { entries, selected } = normalizeOptions(options, value);
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>
      onChange(e.target.value);

    const selectValue = entries.filter(op => selected.includes(op.value));
    const v: string = selectValue.length ? selectValue[0].value : '';
    return (
      <OptionsSelect value={v} onChange={handleChange}>
        {entries.map(entry => (
          <option key={entry.value} value={entry.value}>
            {entry.label}
          </option>
        ))}
      </OptionsSelect>
    );
  }

  return null;
};

addPropertyEditor(ControlTypes.OPTIONS, OptionsEditor);
