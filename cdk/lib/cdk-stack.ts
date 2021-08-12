import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
     
    // S3 bucket
     const bucket = new s3.Bucket(this,"CdkBucket", {
      publicReadAccess: true,
      websiteIndexDocument: "index.html"
    });

    // Deployment
    new s3Deployment.BucketDeployment(this, "CdkDeploymentBucket", {
      sources: [s3Deployment.Source.asset("../public/")],
      destinationBucket: bucket
    });

    // Cloudfront
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'CloudfrontDistribution', {
      originConfigs: [
        {
          s3OriginSource: { 
            s3BucketSource: bucket
          },
          behaviors : [ {isDefaultBehavior: true}]
        }
      ]
    });
  
  }
}