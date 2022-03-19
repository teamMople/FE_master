import AWS from 'aws-sdk';

export const BASE_S3_URL = process.env.REACT_APP_AWS_S3_URL;
const ACCESS_KEY = process.env.REACT_APP_AWS_S3_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY;
const REGION = process.env.REACT_APP_AWS_S3_REGION;
export const BUCKET = process.env.REACT_APP_AWS_S3_BUCKET;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

export const awsS3Bucket = new AWS.S3({
  params: { Bucket: BUCKET },
  region: REGION,
});
