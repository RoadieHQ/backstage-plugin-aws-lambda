import React, { useContext } from 'react';
import { Button, Paper, Box } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { AppContext } from '../../state';

export const SettingsComponent = () => {
  const [, dispatch] = useContext(AppContext);
  return (
    <Paper>
      <Box position="absolute" right={300} top={20}>
        <Button
          color="primary"
          variant="contained"
          onClick={() =>
            dispatch({
              type: 'showSettings',
            })
          }
        >
          <Box
            display="flex"
            alignItems="space-around"
            justifyContent="space-around"
            width="103px"
          >
            <SettingsIcon />
            Settings
          </Box>
        </Button>
      </Box>
    </Paper>
  );
};
