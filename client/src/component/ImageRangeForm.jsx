import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

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
};

export default inject('store')(observer(ImageRangeForm));
