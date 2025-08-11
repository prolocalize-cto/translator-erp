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
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  ArrowLeft,
  Edit,
  Users,
  Eye,
} from "lucide-react"

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const clients = [
    {
      id: "CLI-001",
      company: "TechCorp Inc.",
      industry: "Technology",
      status: "Active",
      contactPerson: "John Smith",
      email: "john.smith@techcorp.com",
      phone: "+1 (555) 123-4567",
      location: "123 Tech Street, San Francisco, CA 94105",
      joinDate: "2023-03-15",
      totalProjects: 12,
      activeProjects: 3,
      totalRevenue: 45230.5,
      averageProjectValue: 3769.21,
      rating: 4.8,
      paymentTerms: "Net 30",
      preferredLanguages: ["Spanish", "French", "German"],
      notes: "Premium client with consistent high-volume projects. Prefers expedited delivery.",
      recentProjects: [
        { id: "PRJ-001", title: "Website Translation", status: "In Progress", value: 650.4 },
        { id: "PRJ-015", title: "Product Manual", status: "Completed", value: 1200.0 },
        { id: "PRJ-012", title: "Marketing Materials", status: "Completed", value: 890.5 },
      ],
      logo: "/client-CLI-001.png",
      lastProject: "2023-09-10",
    },
    {
      id: "CLI-002",
      company: "Global Marketing",
      industry: "Marketing",
      status: "Active",
      contactPerson: "Sarah Johnson",
      email: "sarah@globalmarketing.com",
      phone: "+1 (555) 987-6543",
      location: "456 Marketing Ave, New York, NY 10001",
      joinDate: "2023-06-20",
      totalProjects: 8,
      activeProjects: 2,
      totalRevenue: 28450.75,
      averageProjectValue: 3556.34,
      rating: 4.6,
      paymentTerms: "Net 15",
      preferredLanguages: ["French", "Italian", "Portuguese"],
      notes: "Fast-growing agency with seasonal campaign needs. Very responsive to communications.",
      recentProjects: [
        { id: "PRJ-002", title: "Campaign Materials", status: "Review", value: 480.0 },
        { id: "PRJ-018", title: "Social Media Content", status: "Completed", value: 320.0 },
      ],
      logo: "/client-CLI-002.png",
      lastProject: "2023-08-25",
    },
    {
      id: "CLI-003",
      company: "Legal Associates",
      industry: "Legal",
      status: "Active",
      contactPerson: "Michael Brown",
      email: "mbrown@legalassoc.com",
      phone: "+1 (555) 456-7890",
      location: "789 Law Plaza, Chicago, IL 60601",
      joinDate: "2022-11-10",
      totalProjects: 15,
      activeProjects: 1,
      totalRevenue: 67890.25,
      averageProjectValue: 4526.02,
      rating: 4.9,
      paymentTerms: "Net 45",
      preferredLanguages: ["German", "Spanish", "Mandarin"],
      notes: "Specialized legal translations requiring certified accuracy. Long-term partnership.",
      recentProjects: [
        { id: "PRJ-003", title: "Contract Translation", status: "Completed", value: 1602.0 },
        { id: "PRJ-020", title: "Legal Documents", status: "Completed", value: 2100.0 },
      ],
      logo: "/client-CLI-003.png",
      lastProject: "2023-07-15",
    },
    {
      id: "CLI-004",
      company: "MedTech Solutions",
      industry: "Healthcare",
      status: "Inactive",
      contactPerson: "Dr. Emily Chen",
      email: "echen@medtech.com",
      phone: "+1 (555) 321-0987",
      location: "321 Medical Center Dr, Boston, MA 02101",
      joinDate: "2023-01-08",
      totalProjects: 4,
      activeProjects: 0,
      totalRevenue: 12340.0,
      averageProjectValue: 3085.0,
      rating: 4.2,
      paymentTerms: "Net 30",
      preferredLanguages: ["Japanese", "Korean", "Mandarin"],
      notes: "Medical device documentation. Currently on hold due to regulatory changes.",
      recentProjects: [{ id: "PRJ-025", title: "User Manual", status: "Completed", value: 1850.0 }],
      logo: "/client-CLI-004.png",
      lastProject: "2023-05-20",
    },
  ]

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || client.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  if (selectedClient) {
    return <ClientDetailView client={selectedClient} onBack={() => setSelectedClient(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader currentPage="clients" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Clients</h2>
            <p className="text-gray-600">Manage your client relationships and projects</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogDescription>Create a new client profile in your system</DialogDescription>
              </DialogHeader>
              <NewClientForm />
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
                    placeholder="Search clients, companies, or contact persons..."
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
                  <SelectItem value="all">All Clients</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="prospect">Prospect</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={client.logo || "/placeholder.svg"} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {client.company
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{client.company}</CardTitle>
                      <CardDescription>{client.contactPerson}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      client.status === "Active" ? "default" : client.status === "Inactive" ? "secondary" : "outline"
                    }
                  >
                    {client.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {client.email}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {client.phone}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {client.location}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="h-4 w-4 mr-2" />
                    {client.industry}
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    <div>
                      <div className="text-lg font-semibold text-blue-600">{client.totalProjects}</div>
                      <div className="text-xs text-gray-600">Projects</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-green-600">
                        ${client.totalRevenue.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">Revenue</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-purple-600">{client.rating}/5</div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-gray-500">
                      Last project: {new Date(client.lastProject).toLocaleDateString()}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => setSelectedClient(client)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by adding your first client"}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Client
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Client</DialogTitle>
                    <DialogDescription>Create a new client profile in your system</DialogDescription>
                  </DialogHeader>
                  <NewClientForm />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

function NewClientForm() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company">Company Name</Label>
          <Input id="company" placeholder="Enter company name" />
        </div>
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contact">Contact Person</Label>
          <Input id="contact" placeholder="Primary contact name" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="contact@company.com" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="+1 (555) 123-4567" />
        </div>
        <div>
          <Label htmlFor="payment">Payment Terms</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select payment terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="net15">Net 15</SelectItem>
              <SelectItem value="net30">Net 30</SelectItem>
              <SelectItem value="net45">Net 45</SelectItem>
              <SelectItem value="net60">Net 60</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Textarea id="address" placeholder="Full business address" />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" placeholder="Additional notes about the client" />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline">Cancel</Button>
        <Button>Create Client</Button>
      </div>
    </div>
  )
}

function ClientDetailView({ client, onBack }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader currentPage="clients" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Button>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={client.logo || "/placeholder.svg"} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                  {client.company
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{client.company}</h2>
                <p className="text-gray-600">
                  {client.contactPerson} • {client.industry}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Client
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Contact Person</Label>
                        <p className="text-gray-900">{client.contactPerson}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Industry</Label>
                        <p className="text-gray-900">{client.industry}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Email</Label>
                        <p className="text-gray-900">{client.email}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Phone</Label>
                        <p className="text-gray-900">{client.phone}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Address</Label>
                      <p className="text-gray-900">{client.location}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Preferred Languages</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {client.preferredLanguages.map((lang) => (
                          <Badge key={lang} variant="outline">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Notes</Label>
                      <p className="text-gray-900">{client.notes}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {client.recentProjects.map((project) => (
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
                            <p className="text-sm font-medium mt-1">${project.value.toFixed(2)}</p>
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
                    <CardTitle>Client Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Projects</span>
                      <span className="font-medium">{client.totalProjects}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Projects</span>
                      <span className="font-medium">{client.activeProjects}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Revenue</span>
                      <span className="font-medium">${client.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Avg Project Value</span>
                      <span className="font-medium">${client.averageProjectValue.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Client Since</span>
                      <span className="font-medium">{new Date(client.joinDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Payment Terms</span>
                      <span className="font-medium">{client.paymentTerms}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Project
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Invoice
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>All Projects</CardTitle>
                <CardDescription>Complete project history for {client.company}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {client.recentProjects.map((project) => (
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
                        <p className="text-sm font-medium mt-1">${project.value.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Payment Terms</Label>
                      <p className="text-gray-900">{client.paymentTerms}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Total Revenue</Label>
                      <p className="text-gray-900">${client.totalRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Recent Invoices</h4>
                    <div className="text-sm text-gray-600">No recent invoices to display</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication">
            <Card>
              <CardHeader>
                <CardTitle>Communication History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-medium">Initial client onboarding completed</p>
                    <p className="text-sm text-gray-600">
                      Welcome package sent • {new Date(client.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="font-medium">Project proposal approved</p>
                    <p className="text-sm text-gray-600">
                      Latest project approved by {client.contactPerson} • 3 days ago
                    </p>
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
