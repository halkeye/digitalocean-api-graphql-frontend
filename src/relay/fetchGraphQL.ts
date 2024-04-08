
async function fetchGraphQL(text, variables) {
  let bearerToken = localStorage.getItem('do-bearer-token');
  if (!bearerToken || bearerToken === 'null') {
    bearerToken = prompt("Your bearer token");
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
