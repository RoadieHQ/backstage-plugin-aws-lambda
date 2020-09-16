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

import { createApiRef } from '@backstage/core';
import { LambdaData } from '../types';

export const awsLambdaApiRef = createApiRef<AwsLambdaApi>({
  id: 'plugin.awslambda.service',
  description: 'Used by the AWS lambda plugin to make requests',
});

export type AwsLambdaApi = {
  listLambdas: ({
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
  }) => Promise<{
    lambdaData: LambdaData[];
  }>;
};
