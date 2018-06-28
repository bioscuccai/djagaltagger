import React, { Component } from 'react';
import qs from 'qs';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import PageGroupHolder from './PageGroupHolder';
import ImageRangeMarker from './ImageRangeMarker';

function splitImageRangeIntoPages(imageRanges, pageSize) {
  let splitRanges = imageRanges.map(imageRange => {
    return Object.assign({}, imageRange, {
      pageStart: Math.floor(imageRange.start / pageSize) + 1,
      pageEnd: Math.floor(imageRange.end / pageSize) + 1
    })
  })

  return splitRanges;
}

function groupPages(ranges) {
  let pageGroups = {};

  ranges.forEach(range => {
    for (let page = range.pageStart; page <= range.pageEnd; page++) {
      if (!pageGroups[page]) {
        pageGroups[page] = [];
      }

      pageGroups[page].push(range);
    }
  });

  return pageGroups;
}

class Paginator extends Component {
  render() {
    let elements = [];
    let numPages = Math.ceil(this.props.count / this.props.pageSize);
    let splatPages = splitImageRangeIntoPages(this.props.imageRanges, this.props.pageSize);
    let groupedPages = groupPages(splatPages);

    for (let i = 1; i <= numPages; i++) {
      let newParams = Object.assign({}, this.props.query, {
        page: i
      });

      let shouldDisplayImageRanges = !this.props.query.tag &&
        !this.props.query.artist_id && 
        groupedPages[i];

      elements.push(
        <span key={`paginator-${this.props.paginatorName}-${i}`}>
          <Link
            to={{
              pathname: '/',
              search: qs.stringify(newParams)
            }}
            className="page-link"
          >

            { shouldDisplayImageRanges && <ImageRangeMarker
              imageRanges={ groupedPages[i] }
            /> }

            { shouldDisplayImageRanges && <PageGroupHolder
              imageRanges={ groupedPages[i] }
              page={i}
            /> }

            {i === parseInt(this.props.current, 10) ? <strong>{i}</strong> : i}
          </Link>

          &nbsp;
        </span>
      )
    }

    return (
      <div className="long-list">
        {elements}
      </div>
    );
  }
};

export default observer(Paginator);
