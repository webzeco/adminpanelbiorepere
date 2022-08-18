import { Box, CircularProgress, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { getAllStores } from '../api/Stores';
import useApi from '../hooks/useApi';
import ProductItem from './Common/ProductItem';
function StoreScreen() {
  const getStoreApi = useApi(getAllStores);

  useEffect(() => {
    getStoreApi.request();
  }, []);

  return (
    <Grid container>
      {getStoreApi.loading && (
        <Box
          p={3}
          style={{
            width: '100%',
            height: '100%',
            textAlign: 'center',
            position: 'absolute',
            zIndex: 1,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {getStoreApi.data &&
        getStoreApi.data?.map((item) => (
          <Grid item style={{ margin: 3 }}>
            <ProductItem store={item} />
          </Grid>
        ))}
    </Grid>
  );
}

export default StoreScreen;
