import React, { SyntheticEvent, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function SimpleBanner({
  isVisible,
  onButtonClick,
}: {
  isVisible: boolean;
  onButtonClick: () => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isVisible);
  }, [isVisible]);

  const handleShowSettings = () => {
    setOpen(false);
    onButtonClick();
  };
  const handleClose = (_: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
        message="Please use settings button to set credentials and region"
        action={
          <React.Fragment>
            <Button color="inherit" size="small" onClick={handleShowSettings}>
              SETTINGS
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
