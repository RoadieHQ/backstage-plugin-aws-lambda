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

import { useAsync } from 'react-use';
import { catalogApiRef, EntityCompoundName } from '@backstage/plugin-catalog';
import { useApi } from '@backstage/core';

export const useServiceEntityAnnotations = (name: EntityCompoundName) => {
  const catalogApi = useApi(catalogApiRef);

  const { value, loading, error } = useAsync(async () => {
    const entity = await catalogApi.getEntityByName(name);
    const lambdaNames =
      entity?.metadata.annotations?.['backstage.io/aws-lambda']?.split(',') ??
      [];
    const projectName =
      entity?.metadata.annotations?.['github.com/project-slug'] ?? '';

    return { lambdaNames, projectName };
  });
  return {
    value: value?.projectName,
    lambdaNames: value?.lambdaNames,
    loading,
    error,
  };
};
