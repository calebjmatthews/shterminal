import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResponseButton from './resp_button';
import Reader from '../models/reader';

class Footer extends Component {
  props: FooterProps;

  constructor(props: FooterProps) {
    super(props);
  }

  render() {
    return (
      <div className="footer">
        <div>
          AUTHORIZED RESPONSE OPTIONS:
        </div>
        <div>
          {this.props.reader.permissions.map((permission) => {
            return <ResponseButton key={permission} givenValue={permission} />
          })}
        </div>
      </div>
    );
  }

}

class FooterProps {
  reader: Reader;
}


function mapStateToProps({ reader }) {
  return { reader }
}

export default connect(mapStateToProps)(Footer);
