module.exports = async function handler(req, res) {
  try {
    const loaded = await import('./index.js');
    return loaded.default(req, res);
  } catch (error) {
    console.error('Portfolio API initialization failed:', error);
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Content service is temporarily unavailable.', code: error.code || error.name, detail: error.message }));
  }
};
