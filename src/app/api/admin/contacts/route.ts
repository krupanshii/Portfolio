import { type NextRequest, NextResponse } from "next/server"

// Simple authentication middleware (replace with proper auth in production)
function isAuthenticated(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  // In production, implement proper JWT or session-based authentication
  return authHeader === "Bearer admin-secret-key"
}

export async function GET(request: NextRequest) {
  // Simple auth check (implement proper authentication in production)
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // This would typically fetch from your database
    // For now, we'll redirect to the main contact API
    const response = await fetch(`${request.nextUrl.origin}/api/contact`)
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
