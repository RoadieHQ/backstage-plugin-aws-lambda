import { Entity } from '@backstage/catalog-model';
import React from 'react';
import { Route, Routes } from 'react-router';
import { rootRouteRef } from '../plugin';
import AWSLambdaPage from './AWSLambdaPage';

export const Router = ({ entity }: { entity: Entity }) => {
  return (
    <Routes>
      <Route
        path={`/${rootRouteRef.path}`}
        element={<AWSLambdaPage entity={entity} />}
      />
    </Routes>
  );
};
