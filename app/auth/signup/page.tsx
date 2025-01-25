import SignUpForm from "@/components/sign-up-form"
import Link from "next/link"

export default function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blend-normal">
      <div className="px-8 py-6 mt-4 text-leftbg-blend-normal shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Create a new account</h3>
        <SignUpForm />
        <div className="mt-4 text-center">
          <p>Already have an account?</p>
          <Link href="/auth/signin" className="text-blue-500 hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  )
}

