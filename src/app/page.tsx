"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import Card from "@/components/Card"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

export default function Component() {
  const { data: session , status } = useSession()
  console.log(session)
  console.log(status)

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn()
    }
  }, [session])

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex space-x-7">
              <div>
                <Link href="/" className="flex items-center py-4 px-2">
                  <span className="font-semibold text-gray-500 text-lg">My App</span>
                </Link>
              </div>

            </div>
            <div className="flex items-center space-x-3">
              {session ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">{session.user?.name}</span>
                  <Image
                    src={session.user?.image || "/placeholder.svg"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <button
                    onClick={() => signOut()}
                    className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded transition duration-300"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-300"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto mt-10 px-4 text-black">
        <h1 className="text-3xl font-bold mb-6">Welcome to My App</h1>
        {session ? (
          <p className="text-xl mb-6">Signed in as {session.user?.name}</p>
        ) : (
          <p className="text-xl mb-6">Please sign in to access all features</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <Card

            title="Nature Exploration"
            imageSrc="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
          />
          <Card

            title="Urban Adventure"
            imageSrc="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
          />
          <Card

            title="Culinary Delights"
            imageSrc="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
          />
        </div>
      </main>
    </div>
  )
}



