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

import AWS from 'aws-sdk';
import { AwsLambdaApi } from './AWSLambdaApi';
import { LambdaData } from '../types';
import { FunctionList } from 'aws-sdk/clients/lambda';

function generateCredentials({
  googleIdToken,
  identityPoolId,
  awsAccessKeyId,
  awsAccessKeySecret,
  authMethod,
}: {
  googleIdToken: string;
  identityPoolId: string;
  awsAccessKeyId: string;
  awsAccessKeySecret: string;
  authMethod: string;
}) {
  if (authMethod === 'google') {
    return new AWS.CognitoIdentityCredentials({
      IdentityPoolId: identityPoolId,
      Logins: {
        'accounts.google.com': googleIdToken,
      },
    });
  }
  return new AWS.Credentials({
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsAccessKeySecret,
  });
}
export class AwsLambdaClient implements AwsLambdaApi {
  async listLambdas({
    googleIdToken,
    identityPoolId,
    awsRegion,
    awsAccessKeyId,
    awsAccessKeySecret,
    authMethod,
  }: {
    googleIdToken: string;
    identityPoolId: string;
    awsRegion: string;
    awsAccessKeyId: string;
    awsAccessKeySecret: string;
    authMethod: string;
  }): Promise<{
    lambdaData: LambdaData[];
  }> {
    AWS.config.region = awsRegion;
    AWS.config.credentials = generateCredentials({
      googleIdToken,
      identityPoolId,
      awsAccessKeyId,
      awsAccessKeySecret,
      authMethod,
    });
    const lambdaApi = new AWS.Lambda({});
    const lambdas: FunctionList = [];
    let resp = null;
    do {
      resp = await lambdaApi
        .listFunctions({
          MaxItems: 50,
          Marker: (resp && resp.NextMarker) ?? undefined,
        })
        .promise();
      lambdas.push(...resp.Functions!);
    } while (resp && resp.NextMarker);

    const lambdaData =
      lambdas.map(
        (v: any) =>
          ({
            codeSize: v.CodeSize,
            description: v.Description,
            functionName: v.FunctionName,
            lastModifiedDate: v.LastModified,
            runtime: v.Runtime,
            memory: v.MemorySize,
            region: awsRegion,
          } as LambdaData),
      ) || [];
    return { lambdaData };
  }
}
