/*
 *
 * HomePage
 *
 */
import './index.css';
import { useFetchClient } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import React, { ChangeEventHandler, ReactEventHandler, useEffect, useState } from 'react';

// import pluginId from '../../pluginId';

const getFetches = () => {
  const { get, put, post } = useFetchClient();
  return {
    get: async (url: string) => await get(url).then((res: { status: number; data: any; }) => {
      if (res.status === 200) {
        return res.data;
      }
      else {
        throw(res.status);
      }
    }),
    put: async (url: string, data: Record<string, unknown>) => await put(url, {body: {
      data
    }}).then((res: { status: number; data: any; }) => {
      if (res.status === 200) {
        return res.data;
      }
      else {
        throw(res.status);
      }
    }),
    post: async (url: string) => await post(url).then((res: { status: number; data: any; }) => {
      if (res.status === 200) {
        return res.data;
      }
      else {
        throw(res.status);
      }
    })
  }
}

const HomePage = () => {
  const { get, put } = getFetches();
  const [currentTarget, setCurrentTarget] = useState('default');
  const [targets, setTargets] = useState(['default'] as Array<string>);
  useEffect(() => {
      get('/custom-upload/getCurrentTarget').then((data: any) => {
        setCurrentTarget(data)
      });
      get('/custom-upload/getAllTargets').then((targetsArray: Array<string>) => {
        targetsArray && Array.isArray(targetsArray) ? setTargets(targetsArray) : null;
      })
  }, []);

  const onChangeHandler = (event: {target: {value: unknown}}) => { // wtf? not a single auto type accepted
    get(`custom-upload/setCurrentTarget/${event.target.value}`).then((targetName) => setCurrentTarget(targetName)).catch((e) => console.log(e));
  }
  return (
      <div className='container'>
        <h1 className='centered'> Current Target </h1>
        <select className='centered' value={currentTarget} onChange={onChangeHandler}>
          {targets.map((targetName) => {
            return <option value={targetName}>{targetName}</option>
          })}
        </select>
      </div>    
  );
};

export default HomePage;
