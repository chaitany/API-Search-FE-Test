import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.set('etag', false);

app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Expires', '-1');
  res.set('Pragma', 'no-cache');
  next();
});

interface RawITunesItem {
  wrapperType?: string;
  kind?: string;
  [key: string]: unknown;
}

// Proxy endpoint to bypass CORS
app.get('/api/search', async (req: Request, res: Response) => {
  try {
    const { term, limit = 50 } = req.query;
    
    console.log(`[Backend] Received search request for: "${term}"`);
    
    if (!term || typeof term !== 'string') {
      return res.status(400).json({ error: 'Search term is required and must be a string' });
    }

    const response = await axios.get(
      `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&limit=${limit}&entity=song&media=music`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      }
    );

    const rawData = response.data;
    
    const strictlySongs = rawData.results.filter(
      (item: RawITunesItem) => item.kind === 'song'
    );

    // Reconstruct the response with only the clean data
    const cleanedResponse = {
      resultCount: strictlySongs.length,
      results: strictlySongs
    };

    res.json(cleanedResponse);
  } catch (error) {
    console.error('iTunes API Error:', error);
    res.status(500).json({ error: 'Failed to fetch data from iTunes API' });
  }
});

// Serve React static files in production (assuming client builds to ../client/build)
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});