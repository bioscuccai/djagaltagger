import React, { Component } from 'react';
import { observer } from 'mobx-react';

class DifferenceList extends Component {
  render() {
    return (
      <pre>
        {
          this.props.differences.map(difference => {
            return (
              <div key={`difference-${difference}`}>{difference}</div>
            );
          })
        }
      </pre>
    )
  }
}

export default observer(DifferenceList);
