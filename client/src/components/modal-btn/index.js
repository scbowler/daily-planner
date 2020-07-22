import React from 'react';
import './modal-btn.scss';

export default class ModalBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    this.setState({ isOpen: false });
  }

  open() {
    this.setState({ isOpen: true });
  }

  render() {
    const { isOpen } = this.state;
    const { btnClass, btnText } = this.props;

    if(isOpen) {
      return (
        <div className="modal-btn-container" onClick={this.close}>
          <div className="modal-btn-content" onClick={e => e.stopPropagation()}>
            <h1 className="text-center">This is a modal!</h1>
          </div>
        </div>
      );
    }

    return <button className={btnClass} onClick={this.open}>{btnText}</button>;
  }
}
