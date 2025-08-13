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

  // Function to wrap response in HTML body
  const wrapInBody = (content) => {
    return `<html><body>${content}</body></html>`;
  };

  // Handle GET request
  if (req.method === 'GET') {
    const { x1, x2 } = req.query;

    if (x1 && x2) {
      const randomString = generateRandomString();
      const hash = require('crypto').createHash('md5').update(randomString).digest('hex');
      const result = `8c252c9c0f0af45c7c7e2395848c2141;4f3e3bd0502dbe87a77a1a4883429d94;2026-08-14 11:52:02`;
      const response = Buffer.from(result).toString('base64');
      
      // Return as HTML with body tag
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(wrapInBody(response));
    } else {
      res.setHeader('Content-Type', 'text/html');
      return res.status(400).send(wrapInBody("Error: Please provide both x1 and x2 parameters."));
    }
  }

  // Handle POST request
  if (req.method === 'POST') {
    try {
      let x1, x2;
      
      // Handle both JSON and form-urlencoded POST data
      if (req.headers['content-type'] === 'application/json') {
        ({ x1, x2 } = req.body);
      } else {
        // For form data or other formats
        const body = typeof req.body === 'string' ? require('querystring').parse(req.body) : req.body;
        x1 = body.x1;
        x2 = body.x2;
      }

      if (!x1 || !x2) {
        res.setHeader('Content-Type', 'text/html');
        return res.status(400).send(wrapInBody("Error: Please provide both x1 and x2 in the request body."));
      }

      const randomString = generateRandomString();
      const hash = require('crypto').createHash('md5').update(randomString).digest('hex');
      const result = `${hash};${x1};2025-09-08 16:06:02`;
      const response = Buffer.from(result).toString('base64');

      // Return as HTML with body tag
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(wrapInBody(response));
    } catch (error) {
      res.setHeader('Content-Type', 'text/html');
      return res.status(500).send(wrapInBody(`Error: Internal server error - ${error.message}`));
    }
  }

  // Handle other methods
  res.setHeader('Content-Type', 'text/html');
  return res.status(405).send(wrapInBody("Error: Method not allowed"));
}
