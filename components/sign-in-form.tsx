"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignInForm({ providers }: { providers: any }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null) // For handling error messages
  const [loading, setLoading] = useState(false) // For handling loading state
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true) // Start loading
    setError(null) // Reset previous error message

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    setLoading(false) // End loading

    if (result?.error) {
      setError("Invalid credentials. Please try again.") // Set error message
      console.error(result.error)
    } else {
      router.push("/dashboard")
      setEmail("") // Clear the form fields on success
      setPassword("") // Clear the form fields on success
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>} {/* Display error */}

      <div className="flex items-baseline justify-between">
        <Button 
          type="submit" 
          className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
          disabled={loading} // Disable button during loading
        >
          {loading ? "Logging in..." : "Login"} {/* Loading button text */}
        </Button>
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Forgot password?
        </a>
      </div>

      <div className="mt-6">
        {Object.values(providers).map(
          (provider: any) =>
            provider.name !== "Credentials" && (
              <div key={provider.name} className="mt-2">
                <Button
                  onClick={() => signIn(provider.id)}
                  className="w-full px-4 py-2 border flex justify-center items-center gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
                >
                  <img
                    className="w-6 h-6"
                    src={`https://authjs.dev/img/providers/${provider.id}.svg`}
                    alt={`${provider.name} logo`}
                  />
                  Sign in with {provider.name}
                </Button>
              </div>
            ),
        )}
      </div>
    </form>
  )
}
