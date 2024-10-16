#!/bin/bash

ROLE_ARN="arn:aws:iam::151810432394:role/GitHub-Actions-ECR-michaelignat"
SESSION_NAME="github_actions_session"

# Assume the role and capture the credentials
CREDS=$(aws sts assume-role --role-arn $ROLE_ARN --role-session-name $SESSION_NAME --output json)

# Extract the access key ID, secret access key, and session token from the credentials
AWS_ACCESS_KEY_ID=$(echo $CREDS | jq -r '.Credentials.AccessKeyId')
AWS_SECRET_ACCESS_KEY=$(echo $CREDS | jq -r '.Credentials.SecretAccessKey')
AWS_SESSION_TOKEN=$(echo $CREDS | jq -r '.Credentials.SessionToken')

# Set the environment variables
export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
export AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN

# Get ECR login password
aws ecr get-login-password --region us-east-1
