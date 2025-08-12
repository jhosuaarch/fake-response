export default function handler(req, res) {
  const generateRandomString = (length = 32) => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    
    for (let i = 0; i < length; i++) {
      randomString += characters[Math.floor(Math.random() * characters.length)];
    }
    
    return randomString;
  };

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Function to create proper HTML document
  const createHtmlResponse = (content) => {
    return `<!DOCTYPE html><html><head><title>API Response</title></head><body>${content}</body></html>`;
  };

  // Handle GET request
  if (req.method === 'GET') {
    const { x1, x2 } = req.query;

    if (x1 && x2) {
      const randomString = generateRandomString();
      const hash = require('crypto').createHash('md5').update(randomString).digest('hex');
      const result = `${hash};${x1};2025-09-08 16:06:02`;
      const response = Buffer.from(result).toString('base64');
      
      // Return as complete HTML document
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(createHtmlResponse(response));
    } else {
      res.setHeader('Content-Type', 'text/html');
      return res.status(400).send(createHtmlResponse("Error: Please provide both x1 and x2 parameters."));
    }
  }

  // Handle POST request
  if (req.method === 'POST') {
    try {
      let x1, x2;
      
      if (req.headers['content-type'] === 'application/json') {
        ({ x1, x2 } = req.body);
      } else {
        const body = typeof req.body === 'string' ? require('querystring').parse(req.body) : req.body;
        x1 = body.x1;
        x2 = body.x2;
      }

      if (!x1 || !x2) {
        res.setHeader('Content-Type', 'text/html');
        return res.status(400).send(createHtmlResponse("Error: Please provide both x1 and x2 in the request body."));
      }

      const randomString = generateRandomString();
      const hash = require('crypto').createHash('md5').update(randomString).digest('hex');
      const result = `${hash};${x1};2025-09-08 16:06:02`;
      const response = Buffer.from(result).toString('base64');

      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(createHtmlResponse(response));
    } catch (error) {
      res.setHeader('Content-Type', 'text/html');
      return res.status(500).send(createHtmlResponse(`Error: Internal server error - ${error.message}`));
    }
  }

  res.setHeader('Content-Type', 'text/html');
  return res.status(405).send(createHtmlResponse("Error: Method not allowed"));
}
