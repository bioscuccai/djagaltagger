import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ColorSuggestion from './ColorSuggestion';
import _ from 'lodash';

function defaultBoundaryFromPage(page = 0, pageSize = 40) {
  return {
    start: (page - 1) * pageSize,
    end: (page * pageSize) - 1
  }
}

class ImageRangeForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      color: '#000000',
      mixed: false,
      visible: false,
      ...defaultBoundaryFromPage(this.props.page, this.props.pageSize)
    };

    this.fetchSuggestions = _.debounce(prefix => {
      console.log('suggest ' + prefix);
      this.props.store.imageRanges.fetchSuggestions(prefix)
    }, 200);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page || prevProps.pageSize !== this.props.pageSize) {
      this.setState({
        ...this.state,
        ...defaultBoundaryFromPage(this.props.page, this.props.pageSize)
      });
    }
  }

  render() {
    if (!this.state.visible) {
      return (
        <button className="image-range-form-display button button-outline"
          onClick={this.handleToggleVisibility}
        >
          Mark page
        </button>
      );
    }

    return (
      <div className="bordered-widget image-range-form">
        <h4>Mark page</h4>
        <input type="text" placeholder="Name"
          onChange={e => this.handleFieldChange('name', e.target.value)}/>
        <label>Start</label>
        <input type="number" value={this.state.start}
          onChange={e => this.handleFieldChange('start', e.target.value)} />
        <label>End</label>
        <input type="number" value={this.state.end}
          onChange={e => this.handleFieldChange('end', e.target.value)} />
        <label>Color</label>
        <input type="color" value={this.state.color} onChange={e => this.handleFieldChange('color', e.target.value)}/>
        <div>
          {this.props.store.imageRanges.suggestions.map(imageRange => {
            return (
              <ColorSuggestion
                key={`color-suggestion-${imageRange.pk}`}
                imageRange={imageRange}
                onClick={this.handleColorSuggestionClick.bind(this, imageRange.color)}
              />
            );
          })}
        </div>
        <div className="row" style={{width: '100%'}}>
          <div className="column column-50">
            <button type="button" className="button button-outline"
              onClick={this.handleToggleVisibility}
            >
              Hide
            </button>
          </div>
          <div className="column column-50">
            <input type="submit" value="Create" className="float-right"
              disabled={!this.state.name}
              onClick={this.handleSubmitImageRange} />
          </div>
        </div>
      </div>
    );
  }

  handleFieldChange = (field, value) => {
    this.setState({
      ...this.state,
      [field]: value
    });

    if (field === 'name') {
      this.fetchSuggestions(value);
    }
  }

  handleSubmitImageRange = async (e) => {
    e.preventDefault();
    await this.props.store.imageRanges.createImageRange(this.state);
  }

  handleToggleVisibility = e => {
    this.setState({
      ...this.state,
      visible: !this.state.visible
    });
  }

  handleColorSuggestionClick = color => {
    console.log('setting color ' + color);
    this.setState({
      color
    });
  }
};

export default inject('store')(observer(ImageRangeForm));
