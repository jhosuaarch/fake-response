export default function handler(req, res) {
  const generateRandomString = (length = 32) => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    
    for (let i = 0; i < length; i++) {
      randomString += characters[Math.floor(Math.random() * characters.length)];
    }
    
    return randomString;
  };

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'GET') {
    const { x1, x2 } = req.query;

    if (x1 && x2) {
      const randomString = generateRandomString();
      const hash = require('crypto').createHash('md5').update(randomString).digest('hex');
      const result = `${hash};${x1};2025-09-08 16:06:02`;
      const response = Buffer.from(result).toString('base64');
      
      return res.status(200).json({ data: response });
    } else {
      return res.status(400).json({ error: "Please provide both x1 and x2 parameters." });
    }
  }

  if (req.method === 'POST') {
    try {
      const { x1, x2 } = req.body;

      if (!x1 || !x2) {
        return res.status(400).json({ error: "Please provide both x1 and x2 in the request body." });
      }

      const randomString = generateRandomString();
      const hash = require('crypto').createHash('md5').update(randomString).digest('hex');
      const result = `${hash};${x1};2025-09-08 16:06:02`;
      const response = Buffer.from(result).toString('base64');

      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error", details: error.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
