# AWS lambda plugin

Welcome to the AWS lambda plugin plugin!

_This plugin was created through the Backstage CLI_

## Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn start` in the root directory, and then navigating to (http://localhost:3000/aws-lambda).

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.

## AWS Lambda plugin getting started

There are two options to authenticate with AWS with this plugin (configurable by clicking settings button in lambda table component).

- Identity pools:

  tutorial to use these can be found here:

  https://github.com/spotify/backstage/issues/1988#issuecomment-675559584

- AWS Api key (ACCESS_KEY_ID, ACCESS_KEY_SECRET).

  Please be cautious using these api keys.

  We recommend creating keys in a way that they only have permissions to list lambdas, because storing them in browser may not be always be safe.

Regardless of what auth method you use - you can also decide what functions to show in the table (what functions particular service uses) by annotating backstage.yaml with name of the functions separated by comma, like:

```yaml
metadata:
  annotations:
    backstage.io/aws-lambda: 'HelloWorld,HelloWorld2'
```
