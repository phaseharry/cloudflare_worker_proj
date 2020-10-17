const links = [
  {
    name: 'Github',
    url: 'https://github.com/'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/'
  },
  {
    name: 'Pokemon Showdown',
    url: 'https://pokemonshowdown.com/'
  },
  {
    name: 'Cloudflare',
    url: 'https://www.cloudflare.com/'
  }
];

const staticHtmlInfo = {
  url: 'https://static-links-page.signalnerve.workers.dev',
  reqInfo: {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  }
}

addEventListener('fetch', event => {
  console.log(event);
  event.respondWith(handleRequest(event.request))
})

/**
 * handles requests
 * @param {Request} request
 */
async function handleRequest(request) {
  const { url } = request;
  if (url.indexOf('/links') >= url.length - 7) {
    const json = JSON.stringify({ links });
    return new Response(json, {
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    })
  }
  try {
    const { url, reqInfo } = staticHtmlInfo;
    const res = await fetch(url, reqInfo);
    const htmlString = await convertResponseToString(res);
    return new Response(htmlString, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    })
  } catch (err) {
    console.error(err);
  }
}

/**
 * converts response body to text
 * @param {Request} response
 */
async function convertResponseToString(response) {
  const { headers } = response
  const contentType = headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json())
  }
  else if (contentType.includes("application/text")) {
    return await response.text()
  }
  else if (contentType.includes("text/html")) {
    return await response.text()
  }
  else {
    return await response.text()
  }
}