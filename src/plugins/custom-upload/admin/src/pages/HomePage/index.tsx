/*
 *
 * HomePage
 *
 */
import './index.css';
import { useFetchClient } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import React, { useEffect } from 'react';

// import pluginId from '../../pluginId';

const HomePage = () => {
  const { get } = useFetchClient();
  useEffect(() => {
    const data = get(`/${pluginId}/1/2`);
    console.log(data);
  }, []);
  return (
    <div className='container content-center'>
      {/* <h1 className='container center-content test'>{pluginId}&apos;s HomePage</h1>
      <p>Happy coding</p> */}
      <span> - it's another div/span combination</span>
      <input type='number' value={33} />
    </div>
  );
};

export default HomePage;
