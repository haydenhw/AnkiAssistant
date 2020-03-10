#!/usr/bin/env bash
distributionId=E2VFEAD4TFY8NM
bucket_name=anki.haydenhw.com

if [[ "$1" != --no-build ]]; then
    npm run build
fi
aws2 s3 sync dist s3://$bucket_name &&
aws2 cloudfront create-invalidation \
    --distribution-id $distributionId \
    --paths "/*"



