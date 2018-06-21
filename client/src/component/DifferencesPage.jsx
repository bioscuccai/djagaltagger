import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import DifferenceList from './DifferenceList';

class DifferencePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: ''
    };
  }

  render () {
    return (
      <div>
        <DifferenceList differences={this.props.store.differences.differences} />

        <textarea value={this.state.files}
          onChange={e => this.handleFieldChange('files', e.target.value)}></textarea>
        <button onClick={this.handleCheckDifferences}>Check for differences</button>
      </div>
    );
  }

  handleFieldChange = (field, value) => {
    this.setState({
      ...this.state,
      [field]: value
    });
  }

  handleCheckDifferences = async (e) => {
    e.preventDefault();
    await this.props.store.differences.fetchDifferences(this.state.files);
  }
}

export default inject('store')(observer(DifferencePage));
