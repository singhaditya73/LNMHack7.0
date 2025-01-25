import { getProviders } from "next-auth/react"
import SignInForm from "@/components/sign-in-form"
import Link from "next/link"

export default async function SignIn() {
  const providers = await getProviders()

  return (
    <div className="flex items-center justify-center min-h-screen bg-blend-normal">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 transform hover:scale-105 transition-transform duration-200 ease-in-out">
        <h3 className="text-2xl font-bold text-center">Sign in to your account</h3>
        <SignInForm providers={providers} />
        <div className="mt-4 text-center">
          <p>Don't have an account?</p>
          <Link href="/auth/signup" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  )
}
