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

import React from 'react';
import { render } from '@testing-library/react';
import mockFetch from 'jest-fetch-mock';
import { AWSLambdaTableView } from './AWSLambdaPageTable';

describe('PullRequestTable', () => {
  it('should render', async () => {
    mockFetch.mockResponse(() => new Promise(() => {}));
    const rendered = render(
      <AWSLambdaTableView
        projectName="test"
        page={0}
        total={1}
        lambdaData={[]}
        loading={false}
        pageSize={10}
        retry={() => {}}
        onChangePage={() => {}}
        onChangePageSize={() => {}}
      />,
    );
    expect(
      await rendered.findByText('No records to display'),
    ).toBeInTheDocument();
  });
  it('should render table list item', async () => {
    mockFetch.mockResponse(() => new Promise(() => {}));
    const testFunctionName = 'test function';
    const rendered = render(
      <>
        <AWSLambdaTableView
          projectName="test"
          page={0}
          total={1}
          lambdaData={[
            {
              codeSize: 304,
              description: '',
              functionName: testFunctionName,
              lastModifiedDate: '2020-08-19T07:13:36.341+0000',
              runtime: 'nodejs12.x',
              memory: 128,
              region: 'us-west-2',
            },
          ]}
          loading={false}
          pageSize={10}
          retry={() => {}}
          onChangePage={() => {}}
          onChangePageSize={() => {}}
        />
        ,
      </>,
    );
    expect(await rendered.findByText(testFunctionName)).toBeInTheDocument();
  });
});
