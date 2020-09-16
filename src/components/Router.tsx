import { Entity } from '@backstage/catalog-model';

import { WarningPanel } from '@backstage/core';
import React from 'react';
import { Route, Routes } from 'react-router';
import { AWS_LAMBDA_ANNOTATION } from '../hooks/useServiceEntityAnnotations';
import { rootRouteRef } from '../plugin';
import AWSLambdaPage from './AWSLambdaPage';

export const isPluginApplicableToEntity = (entity: Entity) =>
  entity?.metadata.annotations?.[AWS_LAMBDA_ANNOTATION];

export const Router = ({ entity }: { entity: Entity }) =>
  !isPluginApplicableToEntity(entity) ? (
    <WarningPanel title="AWSLambda plugin:">
      <pre>{AWS_LAMBDA_ANNOTATION}</pre> annotation with the list of lambda
      names to fetch is missing on the entity.
      <br />
      If you want to fetch all functions that your ACCESS KEY has access to
      <br />
      then create following annotation:
      <pre>{AWS_LAMBDA_ANNOTATION}: all</pre>
    </WarningPanel>
  ) : (
    <Routes>
      <Route
        path={`/${rootRouteRef.path}`}
        element={<AWSLambdaPage entity={entity} />}
      />
    </Routes>
  );
