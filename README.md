# Kameleoon Akamai Edgeworkers Starter Kit

> The Kameleoon Akamai Edgeworkers Starter Kit demonstrates Kameleoon experimentation and feature flags on [Akamai Edgeworkers service](https://techdocs.akamai.com/edgeworkers/docs).

This repository is home to the Kameleoon starter kit for Akamai Edgeworkers. Kameleoon is a powerful experimentation and personalization platform for product teams that enables you to make insightful discoveries by testing the features on your roadmap. Discover more at https://kameleoon.com, or see the [developer documentation](https://developers.kameleoon.com).

## Getting started

This starter kit provides quickstart instructions for developers using the [Kameleoon NodeJS SDK](https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/nodejs-sdk) with Akamai Edgeworkers.

### Prerequisites

Make sure you have the following requirements before you get started:

1. A Kameleoon user account. Visit [kameleoon.com](https://www.kameleoon.com/) to learn more.
2. An Akamai Account with EdgeWorkers Acces. For more information, visit the official [Akamai Edgworkers product page here](https://www.akamai.com/products/serverless-computing-edgeworkers).

### Set up the edge environment

First, you'll set up an Akamai EdgeWorker. For this step, please follow the guide below:

1. Create an [EdgeWorker ID](https://techdocs.akamai.com/edgeworkers/docs/create-an-edgeworker-id-1).

2. Add the [EdgeWorker Behavior](https://techdocs.akamai.com/edgeworkers/docs/add-the-edgeworker-behavior-1).

3. Install the [Akamai CLI](https://techdocs.akamai.com/developer/docs/about-clis).

4. Install the [EdgeWorkers CLI](https://techdocs.akamai.com/edgeworkers/docs/akamai-cli#edgeworkers-cli).

5. Setup [Authentication credentials](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials).

6. Generate [EdgeKv access tooken](https://techdocs.akamai.com/edgekv/docs/generate-and-retrieve-edgekv-access-tokens).

7. Initialize [EdgeKv](https://techdocs.akamai.com/edgekv/docs/akamai-cli) and create namespaces for the Akamai environment you plan to use.

## Setup Akamai integration in Kameleoon APP

1. Go to the [Integrations dashboard](app.kameleoon.com/integrations/dashboard).
2. Choose the project you’re going to work with and apply your API credentials which you obtained in step 5.
3. Select Akamai Environment and namespace.

## Use the Akamai EdgeWorker Starter Kit

The Kameleoon Akamai EdgeWorker Starter Kit uses and extends the [Kameleoon NodeJS SDK](https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/nodejs-sdk) to provide experimentation and feature flagging on the edge.

Once you succesfully have an Akamai EdgeWorker set up, you can clone this starter kit, edit it, build it, and upload the build to your EdgeWorker.

1. Create a new folder and pull the code from this Starter kit.

2. Install node modules.

```
npm i
```

3. Add your Kameleoon `SITE_CODE`, `CLIENT_ID` and `CLIENT_SECRET` in `src/constants.ts`. They can be found in the Kameleoon application.

. Add yor Akamai `namespace` which was selected while akamai configuration on the Kameleoon App.

4. Add your edgeKv access-token in `src/lib/edgekv_tokens.js`.

```
// example of edgekv_tokens.js

var edgekv_access_tokens = {
    "namespace-kameleoon" : {
      "name": "kameleoon-token",
      "reference" : "32c17r413-af4d-5da2-1t6s-5aab6013e458"
    },
    "namespace-kameleoon2" : {
      "name": "kameleoon-token2",
      "reference" : "32c17r413-af4d-5da2-1t6s-5aab6013e458"
    },
  }

export { edgekv_access_tokens };
```

> Note:
> Access tokens can be created for multiple namespaces. Each namespace should have its own object with an associated access token. Prefix the token object key with `namespace-` followed by the specific namespace. The full object key should be formatted as `namespace-${namespace}`

5. Build the bundle.

```
npm run build
```

6. Upload the bundle

```
npm run deploy -- {WORKER_ID}
```

7. Activate the version

```
akamai edgeworkers activate {WORKER_ID} {ENVIRONMENT} {EDGEWORKER_VERSION}
```

- `WORKER_ID`: Unique ID for your EdgeWorker. This can be obtained from the Akamai control center.
- `ENVIRONMENT`: The environment the EdgeWorker is being deployed on.
- `EDGEWORKER_VERSION`: The custom version of the EdgeWorker as mentioned in `bundle.json`. This should be updated on every new deployment.

8. Enable [Advanced debug headers](https://techdocs.akamai.com/edgeworkers/docs/enable-enhanced-debug-headers) to receive debug logs in the response headers.

## Additional Resources and Concepts

### Identity Management

Out of the box, Kameleoon's SDKs require a user-provided identifier at runtime to drive experimentation and feature flag results. If the client doesn't provide the User ID directly, this starter kit generates a unique ID as a fallback, stores it into the cookie, and re-uses it to ensure decisions are consistent throughout the user session. Alternatively, you can use an existing unique identifier available within your application and pass it in as the value for the `KAMELEOON_USER_ID` cookie.

### Akamai EdgeWorkers

For more information about Akamai EdgeWorkers, you may visit the following resources:

- [Akamai EdgeWorkers Product Overview](https://developer.akamai.com/akamai-edgeworkers-overview)
- [Akamai EdgeWorkers Official Documentation](https://techdocs.akamai.com/edgeworkers/docs/welcome-to-edgeworkers)
- [Kameleoon NodeJS SDK documentation](https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/nodejs-sdk)
- [Kameleoon Serverless edge compute starter kits](https://developers.kameleoon.com/feature-management-and-experimentation/serverless-edge-compute-starter-kits)
