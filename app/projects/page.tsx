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
  Globe,
  Plus,
  Search,
  Filter,
  Calendar,
  FileText,
  User,
  DollarSign,
  Upload,
  Download,
  Eye,
  Edit,
  ArrowLeft,
} from "lucide-react"

interface ProjectFile {
  name: string
  size: string
  uploaded: string
}

interface Project {
  id: string
  title: string
  client: string
  sourceLanguage: string
  targetLanguage: string
  status: string
  priority: string
  deadline: string
  wordCount: number
  rate: number
  totalValue: number
  assignedTo: string
  progress: number
  createdDate: string
  description: string
  files: ProjectFile[]
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const projects = [
    {
      id: "PRJ-2025-231",
      title: "TechCorp Website Translation",
      client: "TechCorp Inc.",
      sourceLanguage: "English",
      targetLanguage: "Spanish",
      status: "In Progress",
      priority: "High",
      deadline: "2025-08-15",
      wordCount: 5420,
      rate: 0.12,
      totalValue: 650.4,
      assignedTo: "Maria Rodriguez",
      progress: 65,
      createdDate: "2025-08-08",
      description:
        "Complete website translation including all product pages, legal documents, and marketing materials.",
      files: [
        { name: "homepage.docx", size: "2.3 MB", uploaded: "2025-08-08" },
        { name: "products.pdf", size: "1.8 MB", uploaded: "2025-08-08" },
      ],
    },
    {
      id: "PRJ-2025-230",
      title: "Marketing Campaign Materials",
      client: "Global Marketing",
      sourceLanguage: "English",
      targetLanguage: "French",
      status: "Review",
      priority: "Medium",
      deadline: "2025-08-20",
      wordCount: 3200,
      rate: 0.15,
      totalValue: 480.0,
      assignedTo: "Jean Dubois",
      progress: 90,
      createdDate: "2025-08-05",
      description: "Translation of marketing brochures, social media content, and email campaigns.",
      files: [{ name: "brochure.indd", size: "5.2 MB", uploaded: "2025-08-05" }],
    },
    {
      id: "PRJ-2025-229",
      title: "Legal Contract Translation",
      client: "Legal Associates",
      sourceLanguage: "German",
      targetLanguage: "English",
      status: "Completed",
      priority: "Low",
      deadline: "2025-08-10",
      wordCount: 8900,
      rate: 0.18,
      totalValue: 1602.0,
      assignedTo: "Hans Mueller",
      progress: 100,
      createdDate: "2025-08-02",
      description: "Legal document translation with certified accuracy requirements.",
      files: [
        { name: "contract.pdf", size: "3.1 MB", uploaded: "2025-08-02" },
        { name: "addendum.docx", size: "890 KB", uploaded: "2025-08-03" },
      ],
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status.toLowerCase().replace(" ", "-") === statusFilter
    return matchesSearch && matchesStatus
  })

  if (selectedProject) {
    return <ProjectDetailView project={selectedProject} onBack={() => setSelectedProject(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader currentPage="projects" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
            <p className="text-gray-600">Manage all your translation projects</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>Add a new translation project to your system</DialogDescription>
              </DialogHeader>
              <NewProjectForm />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects, clients, or project IDs..."
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
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.client}</CardDescription>
                  </div>
                  <Badge
                    variant={
                      project.status === "Completed"
                        ? "default"
                        : project.status === "In Progress"
                          ? "secondary"
                          : project.status === "Review"
                            ? "outline"
                            : "secondary"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Globe className="h-4 w-4 mr-2" />
                    {project.sourceLanguage} → {project.targetLanguage}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Due: {new Date(project.deadline).toLocaleDateString()}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <FileText className="h-4 w-4 mr-2" />
                    {project.wordCount.toLocaleString()} words
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    {project.assignedTo}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />${project.totalValue.toFixed(2)}
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ 
                          '--progress-width': `${project.progress}%`,
                          width: 'var(--progress-width)'
                        } as React.CSSProperties}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <Badge
                      variant={
                        project.priority === "High"
                          ? "destructive"
                          : project.priority === "Medium"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {project.priority}
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => setSelectedProject(project)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first project"}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>Add a new translation project to your system</DialogDescription>
                  </DialogHeader>
                  <NewProjectForm />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

function NewProjectForm() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Project Title</Label>
          <Input id="title" placeholder="Enter project title" />
        </div>
        <div>
          <Label htmlFor="client">Client</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="techcorp">TechCorp Inc.</SelectItem>
              <SelectItem value="global">Global Marketing</SelectItem>
              <SelectItem value="legal">Legal Associates</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="source">Source Language</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select source language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="target">Target Language</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select target language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Project description and requirements" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="deadline">Deadline</Label>
          <Input id="deadline" type="date" />
        </div>
        <div>
          <Label htmlFor="wordcount">Word Count</Label>
          <Input id="wordcount" type="number" placeholder="0" />
        </div>
        <div>
          <Label htmlFor="rate">Rate per Word</Label>
          <Input id="rate" type="number" step="0.01" placeholder="0.00" />
        </div>
      </div>

      <div>
        <Label htmlFor="priority">Priority</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline">Cancel</Button>
        <Button>Create Project</Button>
      </div>
    </div>
  )
}
function ProjectDetailView({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Globe className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">TranslateERP</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{project.title}</h2>
              <p className="text-gray-600">
                {project.id} • {project.client}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{project.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Source Language</Label>
                        <p className="text-gray-900">{project.sourceLanguage}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Target Language</Label>
                        <p className="text-gray-900">{project.targetLanguage}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Word Count</Label>
                        <p className="text-gray-900">{project.wordCount.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Rate per Word</Label>
                        <p className="text-gray-900">${project.rate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Progress Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm text-gray-600">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                          style={{ 
                            '--progress-width': `${project.progress}%`,
                            width: 'var(--progress-width)'
                          } as React.CSSProperties}
                        ></div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {Math.floor(project.wordCount * (project.progress / 100))}
                          </div>
                          <div className="text-sm text-gray-600">Words Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {project.wordCount - Math.floor(project.wordCount * (project.progress / 100))}
                          </div>
                          <div className="text-sm text-gray-600">Words Remaining</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {Math.ceil(
                              (project.wordCount - Math.floor(project.wordCount * (project.progress / 100))) / 500,
                            )}
                          </div>
                          <div className="text-sm text-gray-600">Days Remaining</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge
                        variant={
                          project.status === "Completed"
                            ? "default"
                            : project.status === "In Progress"
                              ? "secondary"
                              : project.status === "Review"
                                ? "outline"
                                : "secondary"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Priority</span>
                      <Badge
                        variant={
                          project.priority === "High"
                            ? "destructive"
                            : project.priority === "Medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {project.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Created</span>
                      <span className="text-sm">{new Date(project.createdDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Deadline</span>
                      <span className="text-sm">{new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Value</span>
                      <span className="text-sm font-medium">${project.totalValue.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Assigned Translator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`/translator-${project.id}.png`} />
                        <AvatarFallback>
                          {project.assignedTo
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{project.assignedTo}</p>
                        <p className="text-sm text-gray-600">Senior Translator</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4 bg-transparent">
                      Contact Translator
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="files">
            <Card>
              <CardHeader>
                <CardTitle>Project Files</CardTitle>
                <CardDescription>Source documents and translated files</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.files.map((file: ProjectFile, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-600">
                            {file.size} • Uploaded {file.uploaded}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New File
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Project Created</p>
                      <p className="text-sm text-gray-600">{new Date(project.createdDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Translator Assigned</p>
                      <p className="text-sm text-gray-600">{project.assignedTo} assigned to project</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Translation In Progress</p>
                      <p className="text-sm text-gray-600">{project.progress}% completed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication">
            <Card>
              <CardHeader>
                <CardTitle>Communication Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-medium">Initial project briefing sent</p>
                    <p className="text-sm text-gray-600">Sent to {project.assignedTo} • 2 days ago</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="font-medium">Progress update received</p>
                    <p className="text-sm text-gray-600">From {project.assignedTo} • 1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

