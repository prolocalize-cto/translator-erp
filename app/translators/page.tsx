"use client"

import { useState } from "react"
import SharedHeader from "@/components/shared-header" // Import shared header component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Plus,
  Search,
  Filter,
  User,
  Mail,
  MapPin,
  DollarSign,
  FileText,
  ArrowLeft,
  Edit,
  Star,
  Award,
  Languages,
  CheckCircle,
} from "lucide-react"

interface Language {
  source: string
  target: string
  rate: number
  certified: boolean
}

interface Project {
  id: string
  title: string
  status: string
  deadline: string
}

interface Translator {
  id: string
  name: string
  email: string
  phone: string
  location: string
  status: string
  specialization: string
  languages: Language[]
  rating: number
  completedProjects: number
  activeProjects: number
  totalEarnings: number
  averageDeliveryTime: number
  onTimeDelivery: number
  joinDate: string
  lastActive: string
  certifications: string[]
  bio: string
  availability: string
  timezone: string
  recentProjects: Project[]
}

export default function TranslatorsPage() {
  const [selectedTranslator, setSelectedTranslator] = useState<Translator | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [languageFilter, setLanguageFilter] = useState("all")

  const translators = [
    {
      id: "TRA-001",
      name: "Maria Rodriguez",
      email: "maria.rodriguez@email.com",
      phone: "+1 (555) 234-5678",
      location: "Madrid, Spain",
      status: "Available",
      specialization: "Technical Translation",
      languages: [
        { source: "English", target: "Spanish", rate: 0.12, certified: true },
        { source: "French", target: "Spanish", rate: 0.15, certified: false },
      ],
      rating: 4.9,
      completedProjects: 45,
      activeProjects: 2,
      totalEarnings: 28450.75,
      averageDeliveryTime: 2.1,
      onTimeDelivery: 98.5,
      joinDate: "2022-08-15",
      lastActive: "2024-01-12",
      certifications: ["ATA Certified", "ISO 17100"],
      bio: "Experienced technical translator with 8+ years in software localization and technical documentation.",
      availability: "Full-time",
      timezone: "CET",
      recentProjects: [
        { id: "PRJ-001", title: "TechCorp Website", status: "In Progress", deadline: "2024-01-15" },
        { id: "PRJ-008", title: "Software Manual", status: "Completed", deadline: "2024-01-10" },
      ],
    },
    {
      id: "TRA-002",
      name: "Jean Dubois",
      email: "jean.dubois@email.com",
      phone: "+33 1 23 45 67 89",
      location: "Paris, France",
      status: "Busy",
      specialization: "Marketing Translation",
      languages: [
        { source: "English", target: "French", rate: 0.15, certified: true },
        { source: "German", target: "French", rate: 0.18, certified: false },
      ],
      rating: 4.7,
      completedProjects: 32,
      activeProjects: 3,
      totalEarnings: 19230.5,
      averageDeliveryTime: 1.8,
      onTimeDelivery: 96.2,
      joinDate: "2023-02-20",
      lastActive: "2024-01-12",
      certifications: ["CIOL Member"],
      bio: "Creative marketing translator specializing in advertising campaigns and brand messaging.",
      availability: "Part-time",
      timezone: "CET",
      recentProjects: [
        { id: "PRJ-002", title: "Marketing Campaign", status: "Review", deadline: "2024-01-20" },
        { id: "PRJ-011", title: "Brand Guidelines", status: "In Progress", deadline: "2024-01-18" },
      ],
    },
    {
      id: "TRA-003",
      name: "Hans Mueller",
      email: "hans.mueller@email.com",
      phone: "+49 30 12345678",
      location: "Berlin, Germany",
      status: "Available",
      specialization: "Legal Translation",
      languages: [
        { source: "German", target: "English", rate: 0.18, certified: true },
        { source: "English", target: "German", rate: 0.16, certified: true },
      ],
      rating: 4.8,
      completedProjects: 67,
      activeProjects: 1,
      totalEarnings: 45670.25,
      averageDeliveryTime: 3.2,
      onTimeDelivery: 99.1,
      joinDate: "2021-11-05",
      lastActive: "2024-01-11",
      certifications: ["BDÜ Certified", "Sworn Translator"],
      bio: "Certified legal translator with expertise in contracts, patents, and court documents.",
      availability: "Full-time",
      timezone: "CET",
      recentProjects: [{ id: "PRJ-003", title: "Legal Contract", status: "Completed", deadline: "2024-01-10" }],
    },
    {
      id: "TRA-004",
      name: "Yuki Tanaka",
      email: "yuki.tanaka@email.com",
      phone: "+81 3-1234-5678",
      location: "Tokyo, Japan",
      status: "Unavailable",
      specialization: "Medical Translation",
      languages: [
        { source: "English", target: "Japanese", rate: 0.22, certified: true },
        { source: "Japanese", target: "English", rate: 0.2, certified: true },
      ],
      rating: 4.9,
      completedProjects: 28,
      activeProjects: 0,
      totalEarnings: 15890.0,
      averageDeliveryTime: 2.8,
      onTimeDelivery: 100,
      joinDate: "2023-06-12",
      lastActive: "2024-01-05",
      certifications: ["JTA Certified", "Medical Translation Specialist"],
      bio: "Specialized medical translator with background in pharmaceutical and clinical research.",
      availability: "On leave",
      timezone: "JST",
      recentProjects: [{ id: "PRJ-019", title: "Clinical Trial Docs", status: "Completed", deadline: "2023-12-20" }],
    },
  ]

  const filteredTranslators = translators.filter((translator) => {
    const matchesSearch =
      translator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translator.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translator.languages.some(
        (lang) =>
          lang.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lang.target.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    const matchesStatus = statusFilter === "all" || translator.status.toLowerCase().replace(" ", "-") === statusFilter
    const matchesLanguage =
      languageFilter === "all" ||
      translator.languages.some(
        (lang) => lang.source.toLowerCase() === languageFilter || lang.target.toLowerCase() === languageFilter,
      )
    return matchesSearch && matchesStatus && matchesLanguage
  })

  if (selectedTranslator) {
    return <TranslatorDetailView translator={selectedTranslator} onBack={() => setSelectedTranslator(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader currentPage="translators" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Translators</h2>
            <p className="text-gray-600">Manage your translator network and assignments</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Translator
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Translator</DialogTitle>
                <DialogDescription>Register a new translator in your network</DialogDescription>
              </DialogHeader>
              <NewTranslatorForm />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Translators</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{translators.length}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+3</span> this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Now</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{translators.filter((t) => t.status === "Available").length}</div>
              <p className="text-xs text-muted-foreground">Ready for new projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{translators.reduce((sum, t) => sum + t.activeProjects, 0)}</div>
              <p className="text-xs text-muted-foreground">Currently in progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(translators.reduce((sum, t) => sum + t.rating, 0) / translators.length).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">Network quality score</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search translators, specializations, or languages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Languages className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="japanese">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Translators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTranslators.map((translator) => (
            <Card key={translator.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/translator-${translator.id}.png`} />
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {translator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{translator.name}</CardTitle>
                      <CardDescription>{translator.specialization}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      translator.status === "Available"
                        ? "default"
                        : translator.status === "Busy"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {translator.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {translator.location}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Languages className="h-4 w-4 mr-2" />
                    {translator.languages.map((lang) => `${lang.source}→${lang.target}`).join(", ")}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
                    {translator.rating} ({translator.completedProjects} projects)
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <div className="text-sm text-gray-600">Active Projects</div>
                      <div className="font-semibold">{translator.activeProjects}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">On-Time Rate</div>
                      <div className="font-semibold">{translator.onTimeDelivery}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Avg Rate</div>
                      <div className="font-semibold">
                        ${Math.min(...translator.languages.map((l) => l.rate)).toFixed(2)}/word
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Availability</div>
                      <div className="font-semibold">{translator.availability}</div>
                    </div>
                  </div>

                  {/* Language Pairs */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {translator.languages.map((lang, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {lang.source}→{lang.target}
                        {lang.certified && <Award className="h-3 w-3 ml-1 text-yellow-500" />}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="text-xs text-gray-500">
                      Last active: {new Date(translator.lastActive).toLocaleDateString()}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setSelectedTranslator(translator)}>
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTranslators.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No translators found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all" || languageFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by adding your first translator"}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Translator
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Translator</DialogTitle>
                    <DialogDescription>Register a new translator in your network</DialogDescription>
                  </DialogHeader>
                  <NewTranslatorForm />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

function NewTranslatorForm() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Enter translator name" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="translator@email.com" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="+1 (555) 123-4567" />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="City, Country" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="specialization">Specialization</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technical">Technical Translation</SelectItem>
              <SelectItem value="legal">Legal Translation</SelectItem>
              <SelectItem value="medical">Medical Translation</SelectItem>
              <SelectItem value="marketing">Marketing Translation</SelectItem>
              <SelectItem value="literary">Literary Translation</SelectItem>
              <SelectItem value="general">General Translation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="availability">Availability</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" placeholder="Brief description of experience and expertise" />
      </div>

      <div className="space-y-2">
        <Label>Language Pairs</Label>
        <div className="grid grid-cols-3 gap-2">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Target" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Rate/word" type="number" step="0.01" />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline">Cancel</Button>
        <Button>Add Translator</Button>
      </div>
    </div>
  )
}
function TranslatorDetailView({ translator, onBack }: { translator: Translator; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader currentPage="translators" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Translators
          </Button>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`/translator-${translator.id}.png`} />
                <AvatarFallback className="bg-purple-100 text-purple-600 text-xl">
                  {translator.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{translator.name}</h2>
                <p className="text-gray-600">
                  {translator.specialization} • {translator.id}
                </p>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{translator.rating}</span>
                  <Badge
                    className="ml-3"
                    variant={
                      translator.status === "Available"
                        ? "default"
                        : translator.status === "Busy"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {translator.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Assign Project
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="rates">Rates & Languages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Translator Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{translator.bio}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Email</Label>
                        <p className="text-gray-900">{translator.email}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Phone</Label>
                        <p className="text-gray-900">{translator.phone}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Location</Label>
                        <p className="text-gray-900">{translator.location}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Timezone</Label>
                        <p className="text-gray-900">{translator.timezone}</p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">Certifications</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {translator.certifications.map((cert) => (
                          <Badge key={cert} variant="outline" className="bg-green-50 text-green-700">
                            <Award className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Current Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {translator.recentProjects.map((project) => (
                        <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{project.title}</p>
                            <p className="text-sm text-gray-600">{project.id}</p>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                project.status === "Completed"
                                  ? "default"
                                  : project.status === "In Progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {project.status}
                            </Badge>
                            <p className="text-sm text-gray-600 mt-1">
                              Due: {new Date(project.deadline).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Rating</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium ml-1">{translator.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Completed Projects</span>
                      <span className="font-medium">{translator.completedProjects}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Projects</span>
                      <span className="font-medium">{translator.activeProjects}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">On-Time Delivery</span>
                      <span className="font-medium">{translator.onTimeDelivery}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Avg Delivery Time</span>
                      <span className="font-medium">{translator.averageDeliveryTime} days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Earnings</span>
                      <span className="font-medium">${translator.totalEarnings.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Language Pairs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {translator.languages.map((lang, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Languages className="h-4 w-4 mr-2 text-blue-600" />
                          <span className="font-medium">
                            {lang.source} → {lang.target}
                          </span>
                          {lang.certified && <Award className="h-4 w-4 ml-2 text-yellow-500" />}
                        </div>
                        <span className="text-sm font-medium">${lang.rate}/word</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Assign New Project
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      View All Projects
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Payment History
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Project History</CardTitle>
                <CardDescription>All projects assigned to {translator.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {translator.recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-gray-600">{project.id}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            project.status === "Completed"
                              ? "default"
                              : project.status === "In Progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {project.status}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">
                          Due: {new Date(project.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quality Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Rating</span>
                      <span>{translator.rating}/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          '--rating-width': `${(translator.rating / 5) * 100}%`,
                          width: 'var(--rating-width)'
                        } as React.CSSProperties}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>On-Time Delivery</span>
                      <span>{translator.onTimeDelivery}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          '--delivery-width': `${translator.onTimeDelivery}%`,
                          width: 'var(--delivery-width)'
                        } as React.CSSProperties}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Productivity Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{translator.completedProjects}</div>
                    <div className="text-sm text-gray-600">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{translator.averageDeliveryTime}</div>
                    <div className="text-sm text-gray-600">Avg Delivery (days)</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rates">
            <Card>
              <CardHeader>
                <CardTitle>Language Pairs & Rates</CardTitle>
                <CardDescription>Detailed breakdown of language capabilities and pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {translator.languages.map((lang, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Languages className="h-5 w-5 mr-2 text-blue-600" />
                          <span className="font-medium text-lg">
                            {lang.source} → {lang.target}
                          </span>
                          {lang.certified && (
                            <Badge variant="outline" className="ml-2 bg-green-50 text-green-700">
                              <Award className="h-3 w-3 mr-1" />
                              Certified
                            </Badge>
                          )}
                        </div>
                        <span className="text-xl font-bold">${lang.rate}/word</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {lang.certified
                          ? "Certified translation with quality guarantee"
                          : "Professional translation services"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

