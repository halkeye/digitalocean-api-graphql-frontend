import { Variables } from "relay-runtime";
async function fetchGraphQL(text: string | null, variables: Variables) {
  let bearerToken = localStorage.getItem('do-bearer-token');
  if (!bearerToken || bearerToken === 'null') {
    // https://docs.digitalocean.com/reference/api/oauth-api/#2-receive-access-token
    bearerToken = (new URLSearchParams(location.hash.substring(1))).get("access_token")
    location.hash = "";
    if (!bearerToken || bearerToken === 'null') {
      location.assign(`https://cloud.digitalocean.com/v1/oauth/authorize?client_id=${encodeURIComponent(process.env.DO_CLIENT_ID)}&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=token`)
      return null;
    }
  }
  localStorage.setItem('do-bearer-token', bearerToken);

  // Fetch data from GitHub's GraphQL API:
  const response = await fetch(process.env.GRAPHQL_SERVER || '/query', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // TODO - somehow check if got 401
  // unable to authenticate you?
  // if so, then clear localstorage

  // Get the response as JSON
  const body = await response.json();
  if (body.errors) {
    const err = new Error(body.errors.map(err => err.message).join(", "));
    console.error("GraphQL Errors", err);
    throw err;
  }
  return body;
}

export default fetchGraphQL;
