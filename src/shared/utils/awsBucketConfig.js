import AWS from 'aws-sdk';

export const BASE_S3_URL =
  'https://devmaya--resources.s3.ap-northeast-2.amazonaws.com/';
const ACCESS_KEY = 'AKIAUZCKCKDBD7OP2J6O';
const SECRET_ACCESS_KEY = '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';
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
