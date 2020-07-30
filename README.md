# lulo Cognito Describe UserPool Client
lulo Cognito Describe UserPool Client obtains the ClientSecret for a given UserPool client.

lulo Cognito Describe UserPool Client is a [lulo](https://github.com/carlnordenfelt/lulo) plugin

# Installation
```
$ npm install lulo-plugin-cognito-describe-userpool-client --save
```

## Usage
### Properties
* UserPoolId: Required. The UserPoolId
* ClientId: Required. The ClientId

See the [AWS SDK Documentation for CognitoIdentityServiceProvider::describeUserPoolClient](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#describeUserPoolClient-property) for further details.
### Return Values

#### Ref
N/A

#### Fn::GetAtt
**ClientSecret** The client secret value

### Required IAM Permissions
The Custom Resource Lambda requires the following permissions for this plugin to work:
```
{
   "Effect": "Allow",
   "Action": [
       "cognito-idp:DescribeUserPoolClient"
   ],
   "Resource": "*"
}
```

## License
[The MIT License (MIT)](/LICENSE)

## Change Log
[Change Log](/CHANGELOG.md)
