import { Entity } from '@backstage/catalog-model';

import { MissingAnnotationEmptyState } from '@backstage/core';
import React from 'react';
import { Route, Routes } from 'react-router';
import { AWS_LAMBDA_ANNOTATION } from '../hooks/useServiceEntityAnnotations';
import { rootRouteRef } from '../plugin';
import AWSLambdaPage from './AWSLambdaPage';

export const isPluginApplicableToEntity = (entity: Entity) =>
  entity?.metadata.annotations?.[AWS_LAMBDA_ANNOTATION];

export const Router = ({ entity }: { entity: Entity }) =>
  !isPluginApplicableToEntity(entity) ? (
    <MissingAnnotationEmptyState annotation={AWS_LAMBDA_ANNOTATION} />
  ) : (
    <Routes>
      <Route
        path={`/${rootRouteRef.path}`}
        element={<AWSLambdaPage entity={entity} />}
      />
    </Routes>
  );
