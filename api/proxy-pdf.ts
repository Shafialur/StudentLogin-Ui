import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Get URL from query parameter or path
  let targetUrl: string | undefined

  // Check if URL is in query parameter
  if (req.query.url && typeof req.query.url === 'string') {
    targetUrl = decodeURIComponent(req.query.url)
  } else {
    // Fallback: try to reconstruct from path
    const path = req.url?.replace('/proxy-pdf', '') || ''
    if (path) {
      targetUrl = `https://bambinos.live${path}`
    }
  }

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing URL parameter' })
  }

  // Validate URL is from allowed domains
  if (!targetUrl.includes('bambinos.live') && !targetUrl.includes('admin.bambinos.live')) {
    return res.status(403).json({ error: 'Forbidden domain' })
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'Accept': 'application/pdf,*/*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    if (!response.ok) {
      console.error(`PDF fetch failed: ${response.status} ${response.statusText}`)
      return res.status(response.status).json({ 
        error: `Failed to fetch PDF: ${response.statusText}` 
      })
    }

    const buffer = await response.arrayBuffer()
    const contentType = response.headers.get('content-type') || 'application/pdf'
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
    res.setHeader('Content-Length', buffer.byteLength.toString())
    
    return res.send(Buffer.from(buffer))
  } catch (error) {
    console.error('PDF proxy error:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

