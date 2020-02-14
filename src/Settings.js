import React from 'react';
import { Pane, Switch, Label } from 'evergreen-ui';
import './App.css';

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      ...window.pglOptions,
      updateOptions: (key, { target: { checked } }) => {
        window.pglOptions[key] = localStorage[key] = checked;
        this.setState(Object.fromEntries([[key, checked]]));
      },
    };
  }

  render() {
    const { updateOptions, ...rest } = this.state;
    const { user } = this.props;
    const height = 28;

    return (
      <Pane>
        <div>Current User is {user}</div>
        Setting dev to true will set user to test, maybe
        {Object.entries(rest).map(([key, value]) => (
          <Label key={key} height={height}>
            {key}
            <Switch
              height={height}
              checked={value}
              onChange={updateOptions.bind(null, key)}
            />
          </Label>
        ))}
      </Pane>
    );
  }
}
