import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const API_BASE = "http://localhost:3000"

function App() {
  const [url, setUrl] = useState("")
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const shortenUrl = async () => {
    if (!url) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${API_BASE}/api/urls`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: url }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setUrls((prev) => [data, ...prev])
      setUrl("")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchUrls = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/urls`)
      const data = await res.json()
      setUrls(data)
    } catch (err) {
      setError("Failed to fetch URLs")
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-white text-center">
          URL Shortener
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Shorten a URL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && shortenUrl()}
              />
              <Button onClick={shortenUrl} disabled={loading}>
                {loading ? "Shortening..." : "Shorten"}
              </Button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <h2 className="text-white font-semibold">Your URLs</h2>
          <Button variant="outline" onClick={fetchUrls}>
            Load URLs
          </Button>
        </div>

        <div className="space-y-3">
          {urls.map((u) => (
            <Card key={u.id}>
              <CardContent className="pt-4 space-y-1">
                <p className="text-sm text-slate-500 truncate">{u.originalUrl}</p>
                <div className="flex justify-between items-center">
                  <a href={`${API_BASE}/${u.shortCode}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-mono font-semibold hover:underline" >
                    {API_BASE}/{u.shortCode}
                  </a>
                  <span className="text-xs text-slate-400">{u.clicks} clicks</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  )
}

export default App