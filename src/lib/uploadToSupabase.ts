import { END_POINTS } from '@/constants/endpoints';
import universalFetcher from './fetcher';

interface ISignedUrlResponse {
  signedUrl: string;
  path: string;
  token: string;
}

async function getSignedUrl(bucket = 'avatars', fileName: string) {
  const queryParams = {
    bucketName: bucket,
    fileName: fileName,
  };
  const res = await universalFetcher<ISignedUrlResponse>(END_POINTS['file-upload'].getSignedUrl, {
    queryParams,
  });

  return res;
}

export const uploadToSupabase = async (bucket = 'avatars', file: File, userId?: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}.${fileExt}` || formatFileName(file.name) || `${Date.now().toString()}.${fileExt}`;
  const signedUrlResponse = await getSignedUrl(bucket, fileName);
  if (signedUrlResponse) {
    const formData = new FormData();
    formData.append('file', file);

    const config: RequestInit = {
      method: 'PUT',
      body: formData,
    };
    const res = await fetch(signedUrlResponse.signedUrl, config);
    const data = await res.json();
    return data;
  }
};

const formatFileName = (fileName: string) => {
  const extension = fileName.split('.').pop();
  return `${Date.now()}.${extension}`;
};
