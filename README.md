# AWS lambda plugin

![a list of pull requests in the GitHub Pull Requests](https://raw.githubusercontent.com/RoadieHQ/backstage-plugin-aws-lambda/master/docs/lambda-widget.png)

Welcome to the AWS lambda plugin plugin!

_This plugin was created through the Backstage CLI_

This is a plugin that provides a overview widget for your lambda function. It shows the name, description, status of last deployment, reason for unsuccessful deployments and provides link to lambda function and link to logs of the function in cloudwatch.

## AWS Lambda plugin getting started

## auth

In order to perform requests to AWS lambda plugin first asks backend for temporary credentials via /api/aws/credentials

(it uses @roadiehq/backstage-plugin-aws-auth backend plugin)

Regardless of what auth method you use - you can also decide what functions to show in the table (what functions particular service uses) by annotating backstage.yaml with name of the functions separated by comma, like:

```yaml
metadata:
  annotations:
    aws.com/lambda/function-name: HelloWorld
    aws.com/lambda/region: us-east-1
```

In order to add overview widget to your backstage entity page, please update

```js
// packages/app/src/components/catalog/EntityPage.tsx

import {
  AWSLambdaOverviewWidget,
  isPluginApplicableToEntity as isLambdaWidgetAvailable,
} from '@roadiehq/backstage-plugin-aws-lambda';

...

const OverviewContent = ({ entity }: { entity: Entity }) => (
  <Grid container spacing={3}>
    ...
    {isLambdaWidgetAvailable(entity) && (
      <Grid item>
        <AWSLambdaOverviewWidget entity={entity} />
      </Grid>
    )}
  </Grid>
);
```

Add the api to

```js
// packages/app/src/plugins.ts

export { plugin as AWSLambdaWidget } from '@roadiehq/backstage-plugin-aws-lambda';
```

Make sure you have aws auth backend plugin in your backstage backend (@roadiehq/backstage-plugin-aws-auth in packages/backend/src/plugins/aws.ts)
