import React from 'react';
import ReactLoading from 'react-loading';

export default function InnerLoading() {
  return (
    <div
      style={{
        width: '30px',
        margin: '0 auto',
      }}
    >
      <ReactLoading
        type={'spin'}
        color={'white'}
        height={30}
        width={30}
      />
    </div>
  );
}
