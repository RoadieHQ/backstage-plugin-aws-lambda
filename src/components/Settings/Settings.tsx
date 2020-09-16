/*
 * Copyright 2020 RoadieHQ
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  List,
  ListItem,
  Snackbar,
  Box,
  Dialog,
  DialogTitle,
  Typography,
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';
import { useSettings } from '../../state';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function TabPanel(props: {
  children: React.ReactNode;
  value: number;
  index: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const Settings = ({ repoName }: { repoName: string }) => {
  const [
    {
      identityPoolId: identityPoolIdFromStore,
      region: regionFromStore,
      awsAccessKeyId: awsAccessKeyIdFromStore,
      awsAccessKeySecret: awsAccessKeySecretFromStore,
      authMethod: authMethodFromStore,
      showSettings,
    },
    { saveSettings, hideSettings },
  ] = useSettings(repoName);

  const [identityPoolId, setIdentityPoolId] = useState(
    () => identityPoolIdFromStore,
  );
  const [region, setRegion] = useState(() => regionFromStore);
  const [awsAccessKeyId, setAwsAccessKeyId] = useState(
    () => awsAccessKeyIdFromStore,
  );
  const [awsAccessKeySecret, setAwsAccessKeySecret] = useState(
    () => awsAccessKeySecretFromStore,
  );

  useEffect(() => {
    if (identityPoolIdFromStore !== identityPoolId) {
      setIdentityPoolId(identityPoolId);
    }
    if (regionFromStore !== region) {
      setRegion(region);
    }
  }, [
    regionFromStore,
    identityPoolIdFromStore,
    authMethodFromStore,
    identityPoolId,
    authMethodFromStore,
    region,
  ]);
  const [value, setValue] = useState(authMethodFromStore === 'aws' ? 1 : 0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (event) {
      setValue(newValue);
    }
  };

  const [saved, setSaved] = useState(false);
  return (
    <>
      <Snackbar
        autoHideDuration={1000}
        open={saved}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setSaved(false)}
      >
        {/* <Alert severity="success">Credentials saved.</Alert> */}
      </Snackbar>
      <Dialog open={showSettings} onClose={hideSettings}>
        <DialogTitle>
          Project Credentials
          {/* {authed ? <StatusOK /> : <StatusFailed />} */}
        </DialogTitle>
        <Box minWidth="400px">
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="GOOGLE SIGN IN" {...a11yProps(0)} />
              <Tab label="AWS API KEYS" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <ListItem>
              <TextField
                name="aws-identityPoolId"
                fullWidth
                label="Identity Pool Id"
                variant="outlined"
                value={identityPoolId}
                onChange={e => setIdentityPoolId(e.target.value)}
              />
            </ListItem>
            <ListItem>
              <Box height="55px" />
            </ListItem>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ListItem>
              <TextField
                name="aws-access-key-id"
                label="AWS Access Key Id"
                fullWidth
                variant="outlined"
                value={awsAccessKeyId}
                onChange={e => setAwsAccessKeyId(e.target.value)}
              />
            </ListItem>

            <ListItem>
              <TextField
                name="aws-secret-access-key"
                label="AWS Secret Access Key"
                fullWidth
                type="password"
                variant="outlined"
                value={awsAccessKeySecret}
                onChange={e => setAwsAccessKeySecret(e.target.value)}
              />
            </ListItem>
          </TabPanel>
          <List>
            <ListItem>
              <Typography variant="body2" noWrap />
            </ListItem>
            <ListItem>
              <Box paddingLeft="30px">
                <TextField
                  name="aws-region"
                  label="AWS Region"
                  fullWidth
                  variant="outlined"
                  value={region}
                  onChange={e => setRegion(e.target.value)}
                />
              </Box>
            </ListItem>
            <ListItem>
              <Box mt={2} display="flex" width="100%" justifyContent="center">
                <Button
                  data-testid="aws-auth-button"
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setSaved(true);
                    saveSettings({
                      identityPoolId,
                      region,
                      awsAccessKeyId,
                      awsAccessKeySecret,
                      authMethod: value === 0 ? 'google' : 'aws',
                    });
                    hideSettings();
                  }}
                >
                  Save credentials
                </Button>
              </Box>
            </ListItem>
          </List>
        </Box>
      </Dialog>
    </>
  );
};

export default Settings;
