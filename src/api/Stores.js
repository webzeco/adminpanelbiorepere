import client from './client';
export const getAllStores = () => client.get('/stores/all');
const getTrendingStores = () => client.get('/store/trend');
const getDownloadStoreLink = (id) =>
  client.get(`/store/temporary-download/${id}`);
const getAllCategories = () =>
  client.get(
    '/store/getAllCate',
    {},
    {
      onDownloadProgress: (prog) => {
        console.log('progress', prog);
      },
    }
  );

const getSameCateStores = (cate) =>
  client.get(`/store/samecate/${cate}`);
export const uploadStore = (store, onUploadProgress) => {
  const data = new FormData();
  data.append('title', store.title);
  data.append('website', store.website);
  data.append('phone', store.phone);
  data.append('description', store.description);
  data.append('logo', store.logo);
  data.append('address', JSON.stringify(store.address));
  return client.post('/stores/add', data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};
