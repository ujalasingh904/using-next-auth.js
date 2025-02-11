"use client"

import { useState, useEffect } from "react" 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, Plus, Moon, Sun, Menu } from "lucide-react"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import img from '../../public/logo.png'

export default function ChatInterface() {
  const [theme, setTheme] = useState<any>(
    sessionStorage.getItem("theme") || "light")

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { data: session } = useSession()

  useEffect(() => {

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    document.documentElement.classList.toggle("dark")
    const newTheme = theme === "light" ? "dark" : "light"
    sessionStorage.setItem("theme", newTheme)
    setTheme(newTheme)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div
      className={`flex h-screen transition-colors duration-200 ${theme === "dark" ? "bg-[#1F1F1F] text-white" : "bg-white"}`}
    >

      <div
        className={`${isSidebarOpen ? "w-full md:w-80" : "w-0"
          } fixed md:relative z-30 h-screen transition-all duration-300 overflow-hidden
        ${theme === "dark" ? "bg-[#2A2A2A]" : "bg-[#74ceff84]"}`}
      >
        <div className={`p-4 border-b ${theme === "dark" ? "border-gray-700" : ""}`}>
          <div className="flex items-center justify-between">
            <h1 className="text-lg md:text-xl font-bold">XZAYOGN</h1>
            <Button
              variant={theme === "dark" ? "outline" : "outline"}
              size="icon"
              className={`h-8 w-8 ${theme === "dark" ? "border-gray-700" : ""}`}
              onClick={toggleSidebar}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <rect x="2" y="2" width="11" height="11" rx="2" stroke="currentColor" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-70px)]">
          <div
            className={`${theme === "dark" ? "bg-[#1F1F1F]" : "bg-white"} rounded-lg p-3 flex items-center justify-between`}
          >
            <span className="font-medium text-sm md:text-base">Upcoming</span>
            <div className="flex gap-1">
              <span className="text-pink-500">✧</span>
              <span role="img" aria-label="gift" className="text-pink-500">
                🎁
              </span>
            </div>
          </div>

          <div
            className={`${theme === "dark" ? "bg-[#1F1F1F]" : "bg-white"} rounded-lg p-3 flex items-center justify-between`}
          >
            <span className="font-medium text-sm md:text-base">New Chat</span>
            <Plus className="h-4 w-4" />
          </div>

          <div className="mt-6">
            <h2 className="text-xs md:text-sm font-medium text-gray-500 mb-2">Today</h2>
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div key={`today-${i}`} className={`${theme === "dark" ? "bg-[#1F1F1F]" : "bg-white"} rounded-lg p-3`}>
                  <p className={`text-xs md:text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    Some one line chat prompt...
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xs md:text-sm font-medium text-gray-500 mb-2">Chat history</h2>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={`history-${i}`} className={`${theme === "dark" ? "bg-[#1F1F1F]" : "bg-white"} rounded-lg p-3`}>
                  <p className={`text-xs md:text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    Some one line chat prompt...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {!isSidebarOpen && (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className={`hidden md:flex fixed left-4 top-4 z-20 h-8 w-8 
            ${theme === "dark" ? "bg-[#2A2A2A] border-gray-700 hover:bg-[#3A3A3A]" : "bg-white hover:bg-gray-100"}`}
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}

      <div className="flex-1 flex flex-col relative">
        <header
          className={`p-3 md:p-4 flex justify-between ${isSidebarOpen ? 'md:justify-end' : 'justify-between'} items-center gap-2 md:gap-4 border-b ${theme === "dark" ? "border-gray-700" : ""
            }`}
        >
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${isSidebarOpen ? '!hidden' : 'block'} flex justify-center items-center`}
            onClick={toggleSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </Button>

          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <div className="flex items-center space-x-3">
              {session ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">{session.user?.name}</span>
                  <Image
                    src={session.user?.image || "/placeholder.svg"}
                    alt="Profile"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <button
                    onClick={() => signOut()}
                    className="py-1 px-3 bg-red-500 hover:bg-red-600 text-white rounded transition duration-300"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="py-1 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-300"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-3 md:p-4">
          <div className="text-center space-y-6 md:space-y-8 max-w-2xl w-full">
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <div className="h-8 w-8 md:h-10 md:w-10 flex justify-center items-center">
                <Image
                  src={img}
                  alt="XZAYOGN"
                /> 
              </div>
              <h2 className="text-lg md:text-xl font-medium">hey i am xzayogn.</h2>
            </div>

            <div className="relative">
              <Input
                className={`w-full pr-10 rounded-lg text-sm md:text-base ${theme === "dark"
                  ? "bg-[#2A2A2A] border-gray-700 text-white placeholder-gray-400"
                  : "border shadow-sm"
                  }`}
                placeholder="Message xzayogn"
              />
              <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Mic className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {["Career in gaming industry", "Learning freelance work", "Public speaking course", "More"].map(
                (text, index) => (
                  <Button
                    key={`button-${index}`}
                    variant="outline"
                    className={`text-xs md:text-sm rounded-full ${theme === "dark" ? "border-gray-700 bg-[#2A2A2A] hover:bg-[#3A3A3A]" : ""
                      }`}
                  >
                    {text}
                  </Button>
                ),
              )}
            </div>
          </div>
        </main>

        <footer className="p-3 md:p-4 text-center">
          <div className={`space-x-2 md:space-x-4 text-xs md:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            {["FAQ", "Privacy Policy", "Terms of Service", "Contact Us"].map((text, index, arr) => (
              <span key={index}>
                <Link href="#" className="hover:underline">{text}</Link>
                {index < arr.length - 1 && <span className="mx-1 md:mx-2">|</span>}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </div>
  )
}