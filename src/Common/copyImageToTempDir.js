import RNFS from 'react-native-fs';

export const copyImageToTempDir = async () => {
  const tempFilePath = RNFS.TemporaryDirectoryPath + '/fallbackMarket.jpg';
  const sourcePath = `src/Assets/FarmImagesfallbackMarket.jpg`;

  try {
    await RNFS.copyFileAssets(sourcePath, tempFilePath);
    console.log('Image copied to temp directory:', tempFilePath);
    return tempFilePath;
  } catch (error) {
    console.error('Error copying image:', error);
  }
};
