import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus } from "lucide-react"

interface SharedHeaderProps {
  currentPage: string
}

export default function SharedHeader({ currentPage }: SharedHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="/prolocalize-logo.svg" alt="ProLocalize Logo" className="h-10 w-auto" />
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={
                currentPage === "dashboard" ? "text-blue-600 font-medium" : "text-gray-500 hover:text-gray-700"
              }
            >
              Dashboard
            </Link>
            <Link
              href="/projects"
              className={currentPage === "projects" ? "text-blue-600 font-medium" : "text-gray-500 hover:text-gray-700"}
            >
              Projects
            </Link>
            <Link
              href="/clients"
              className={currentPage === "clients" ? "text-blue-600 font-medium" : "text-gray-500 hover:text-gray-700"}
            >
              Clients
            </Link>
            <Link
              href="/translators"
              className={
                currentPage === "translators" ? "text-blue-600 font-medium" : "text-gray-500 hover:text-gray-700"
              }
            >
              Translators
            </Link>
            <Link
              href="/finance"
              className={currentPage === "finance" ? "text-blue-600 font-medium" : "text-gray-500 hover:text-gray-700"}
            >
              Finance
            </Link>
            <Link
              href="/reports"
              className={currentPage === "reports" ? "text-blue-600 font-medium" : "text-gray-500 hover:text-gray-700"}
            >
              Reports
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/projects">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </Link>
            <Avatar>
              <AvatarImage src="/pirachat-profile.png" />
              <AvatarFallback>PC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
