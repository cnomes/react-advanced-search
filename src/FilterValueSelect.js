// @flow
import React from 'react';
import Select from './components/Select';
import SelectWrapper from './components/SelectWrapper';
import type { ReactSelectOption } from './types';

type Props = {
  value: string | Array<string>,
  options: Array<ReactSelectOption>,
  onChange: (string | Array<string>) => void,
  multi: boolean,
};

type State = {
  value: string | Array<string>,
};

class FilterValueSelect extends React.Component {
  props: Props;

  state: State;

  defaultProps = {
    multi: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.state.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  handleSelectRef = (select: ReactClass<*>) => {
    if (!select) {
      return;
    }
    select.focus();
  };

  handleChange = (data: ReactSelectOption | Array<ReactSelectOption>) => {
    if (data instanceof Array) {
      this.setState({
        value: data.map(d => d.value),
      });
    } else {
      this.setState({
        value: data && data.value,
      });
    }
  };

  handleBlur = () => {
    // Wait for setState of 'handleChange()' if both change and blur events happened
    setTimeout(() => {
      const value = this.state.value;
      if (value && value instanceof Array && value.length > 0) {
        this.props.onChange(value);
      } else if (value && value !== '') {
        this.props.onChange(value);
      }
    });
  };

  render() {
    const { value, options, onChange, multi, ...other } = this.props;
    const single = !multi;

    return (
      <SelectWrapper>
        <Select
          innerRef={this.handleSelectRef}
          value={this.state.value}
          options={options}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onClose={this.handleBlur}
          autoFocus={true}
          autoBlur={single}
          openOnFocus={true}
          openAfterFocus={true}
          clearable={false}
          arrowRenderer={() => {}}
          multi={multi}
          tabSelectsValue={false}
          joinValues={multi}
          {...other}
        />
      </SelectWrapper>
    );
  }
}

export default FilterValueSelect;
