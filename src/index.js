const aws = require('aws-sdk');
const cognitoIdp = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

module.exports = {
    validate,
    create,
    update,
    delete: deleteFn,
};

function validate(event) {
    if (!event.ResourceProperties.UserPoolId) {
        throw new Error('Missing required property UserPoolId');
    }
    if (!event.ResourceProperties.ClientId) {
        throw new Error('Missing required property ClientId');
    }
}

function create(event, _context, callback) {
    const params = {
        UserPoolId: event.ResourceProperties.UserPoolId,
        ClientId: event.ResourceProperties.ClientId,
    };
    cognitoIdp.describeUserPoolClient(params, function (error, response) {
        if (error) {
            return callback(error);
        }

        const data = {
            ClientSecret: response.UserPoolClient.ClientSecret,
        };
        callback(null, data);
    });
}

function update(event, context, callback) {
    return create(event, context, callback);
}

function deleteFn(_event, _context, callback) {
    return callback();
}
