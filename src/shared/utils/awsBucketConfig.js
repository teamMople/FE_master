import AWS from 'aws-sdk';

export const BASE_S3_URL =
  'https://devmaya--resources.s3.ap-northeast-2.amazonaws.com/';
const ACCESS_KEY = process.env.REACT_APP_AWS_S3_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY;
const REGION = 'ap-northeast-2';
export const BUCKET = 'devmaya--resources';

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

export const awsS3Bucket = new AWS.S3({
  params: { Bucket: BUCKET },
  region: REGION,
});
