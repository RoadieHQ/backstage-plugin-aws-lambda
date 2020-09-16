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
import { errorApiRef, useApi } from '@backstage/core';
import { useContext, useEffect } from 'react';
import { AppContext, STORAGE_KEY } from './AppState';
import { Settings } from './types';

export function useSettings(repoName: string) {
  const [settings, dispatch] = useContext(AppContext);

  const errorApi = useApi(errorApiRef);

  useEffect(() => {
    const rehydrate = () => {
      try {
        const stateFromStorage = JSON.parse(
          localStorage.getItem(`${STORAGE_KEY}.${repoName}`)!,
        );
        if (
          stateFromStorage &&
          Object.keys(stateFromStorage).some(
            k => (settings as any)[k] !== stateFromStorage[k],
          )
        )
          dispatch({
            type: 'setCredentials',
            payload: stateFromStorage,
          });
      } catch (error) {
        errorApi.post(error);
      }
    };

    rehydrate();
  }, [dispatch, errorApi, settings, repoName]);

  const persist = (state: Settings) => {
    localStorage.setItem(`${STORAGE_KEY}.${repoName}`, JSON.stringify(state));
  };

  return [
    settings,
    {
      saveSettings: (state: Settings) => {
        persist(state);
        dispatch({
          type: 'setCredentials',
          payload: state,
        });
      },
      showSettings: () => dispatch({ type: 'showSettings' }),
      hideSettings: () => dispatch({ type: 'hideSettings' }),
    },
  ] as const;
}
