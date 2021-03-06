/* globals window */

import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';
import url from 'url';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Button, Dialog, DialogContent, DialogContentText } from 'material-ui';
import DoneIcon from 'material-ui-icons/Done';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';
import { decodeConfig } from '../helpers';

class MobileOverlay extends Component {
  constructor() {
    super();

    const config = decodeConfig();
    this.qrCodeUrl = url.format({
      protocol: 'http',
      hostname: config.localIP,
      port: config.mapServerPort,
      pathname: '/app.html',
      query: {
        mode: 'remote',
        remoteServerIP: config.localIP,
        remoteMapServerPort: config.mapServerPort,
      },
    });
    this.state = {
      wasCopied: false,
    };
    this.handleCopy = this.handleCopy.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeys.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown');
  }

  handleKeys(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      this.props.onClose();
    }
  }

  handleCopy() {
    this.setState({ wasCopied: true });
  }

  render() {
    return (
      <Dialog
        maxWidth="xs"
        open={this.props.visible}
        onClose={this.props.onClose}
      >
        <DialogContent style={{ textAlign: 'center' }}>
          <DialogContentText>
            The below link is an URL to display this map from another device on this network.
          </DialogContentText>
          <div id="qrcode">
            <QRCode value={this.qrCodeUrl} size={250} />
          </div>
          <CopyToClipboard text={this.qrCodeUrl} onCopy={this.handleCopy}>
            {this.state.wasCopied ? (
              <Button dense raised disabled color="primary">
                <DoneIcon />&nbsp;
                Link copied
              </Button>
            ) : (
              <Button dense raised color="primary">
                <ContentCopyIcon />&nbsp;
                Click to copy the link
              </Button>
            )}
          </CopyToClipboard>
        </DialogContent>
      </Dialog>
    );
  }
}

MobileOverlay.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MobileOverlay;
