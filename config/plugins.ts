export default () => {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey =
    process.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_ACCESS_SECRET;

  if (!accessKeyId || !secretAccessKey) {
    // eslint-disable-next-line no-console
    console.warn(
      "[upload::aws-s3] ⚠️  Missing S3 credentials. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY (or AWS_ACCESS_SECRET). " +
        "The AWS SDK will attempt other credential providers (instance profile, web identity, etc.)."
    );
  }

  return {
    upload: {
      config: {
        provider: "aws-s3",
        providerOptions: {
          s3Options: {
            credentials: {
              accessKeyId,
              secretAccessKey,
            },
            forcePathStyle: true,
            endpoint: process.env.AWS_ENDPOINT,
            region: process.env.AWS_REGION,
            params: {
              ACL: "private",
              signedUrlExpires: process.env.AWS_SIGNED_URL_EXPIRES || 15 * 60,
              Bucket: process.env.AWS_BUCKET,
            },
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
  };
};
