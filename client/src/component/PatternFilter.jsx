import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

class PatternFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pattern: ''
    }
  }
  
  render() {
    return (
      <div className="row">
        <div className="column column-80">
          <input type="search" placeholder="Filename regexp" onChange={e => this.handleFieldChange('pattern', e.target.value)}/>
        </div>

        <div>
          <button className="button" onClick={this.handleFilter}>Filter</button>
        </div>
      </div>
    );
  }

  handleFieldChange = (field, value) => {
    this.setState({
      ...this.state,
      [field]: value
    });
  }

  handleFilter = (e) => {
    console.log(this.props.history);
    e.preventDefault();
    this.props.history.push({
      pathname: '/',
      search: qs.stringify({
        filename_pattern: this.state.pattern
      })
    })
  }
};

export default withRouter(PatternFilter);
