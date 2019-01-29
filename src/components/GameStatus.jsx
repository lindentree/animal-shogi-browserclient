import React from 'react';

export default class GameStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <textarea rows="5" cols="70" id="PlayerInfo" value={this.props.text} defaultValue="This is a description." >
      </textarea>
    );
  }
}
