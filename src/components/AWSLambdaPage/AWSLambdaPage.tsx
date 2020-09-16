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

import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import {
  Header,
  Page,
  pageTheme,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core';
import { AWSLambdaPageTable } from '../AWSLambdaPageTable';
import { AppStateProvider } from '../../state';

const AWSLambdaPage: FC<{}> = () => (
  <AppStateProvider>
    <Page theme={pageTheme.tool}>
      <Header
        title="Welcome to AWS lambda plugin!"
        subtitle="Optional subtitle"
      >
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <ContentHeader title="AWS lambda plugin">
          <SupportButton>
            Plugin to show a project's AWS lambda functions
          </SupportButton>
        </ContentHeader>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <AWSLambdaPageTable />
          </Grid>
        </Grid>
      </Content>
    </Page>
  </AppStateProvider>
);

export default AWSLambdaPage;
