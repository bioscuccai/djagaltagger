import React, { Component } from 'react';

class ColorSuggestion extends Component {
  render () {
    return (
      <span
        onClick={this.props.onClick}
        className="color-suggestion"
        style={{
          color: this.props.imageRange.color
        }
      }>
        {this.props.imageRange.name}
      </span>
    );
  }
}

export default ColorSuggestion;
