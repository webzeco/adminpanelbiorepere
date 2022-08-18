import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';

const Media = (props) => {
  const [pictures, setPictures] = useState([]);
  const [picturesNameList, setPicturesNameList] = useState([]);

  React.useEffect(() => {
    const namearr = [];
    pictures.map((pic) => {
      namearr.push(pic.name);
    });
    setPicturesNameList(namearr);
    props.setImages(pictures);
  }, [pictures]);

  React.useEffect(() => {
    props.setImagesList(picturesNameList);
  }, [picturesNameList]);

  const onDrop = (picture) => {
    setPictures(picture);
  };
  return (
    <ImageUploader
      withPreview={true}
      withIcon={false}
      style={{ width: '50%', alignSelf: 'center' }}
      onChange={onDrop}
      buttonText="Choose Logo"
      buttonStyles={{ background: 'green' }}
      imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
      maxFileSize={5242880}
    />
  );
};

export default Media;
