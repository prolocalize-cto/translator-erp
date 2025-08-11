import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import SharedHeader from "@/components/shared-header" // Import shared header component
import {
  BarChart3,
  Users,
  FileText,
  DollarSign,
  Clock,
  Globe,
  Plus,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader currentPage="dashboard" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Pirachat</h2>
          <p className="text-gray-600">Here's what's happening with your translation business today.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8</span> new this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+20.1%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Turnaround</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4 days</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">-0.3</span> days improvement
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Recent Projects
                </CardTitle>
                <CardDescription>Latest translation projects and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "PRJ-001",
                      client: "TechCorp Inc.",
                      language: "EN → ES",
                      status: "In Progress",
                      deadline: "2 days",
                      priority: "High",
                    },
                    {
                      id: "PRJ-002",
                      client: "Global Marketing",
                      language: "EN → FR",
                      status: "Review",
                      deadline: "5 days",
                      priority: "Medium",
                    },
                    {
                      id: "PRJ-003",
                      client: "Legal Associates",
                      language: "DE → EN",
                      status: "Completed",
                      deadline: "Delivered",
                      priority: "Low",
                    },
                    {
                      id: "PRJ-004",
                      client: "Medical Corp",
                      language: "EN → JA",
                      status: "Assigned",
                      deadline: "7 days",
                      priority: "High",
                    },
                  ].map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{project.id}</p>
                          <p className="text-sm text-gray-500">{project.client}</p>
                        </div>
                        <Badge variant="outline">{project.language}</Badge>
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
                      <div className="text-right">
                        <p className="text-sm font-medium">{project.deadline}</p>
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
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/projects">
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View All Projects
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Alerts */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/projects">
                  <Button className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Project
                  </Button>
                </Link>
                <Link href="/clients">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="h-4 w-4 mr-2" />
                    Add New Client
                  </Button>
                </Link>
                <Link href="/translators">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Globe className="h-4 w-4 mr-2" />
                    Find Translator
                  </Button>
                </Link>
                <Link href="/reports">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Alerts & Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                  Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Urgent Deadline</p>
                    <p className="text-xs text-red-600">PRJ-001 due in 2 days</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Clock className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Pending Review</p>
                    <p className="text-xs text-yellow-600">3 projects awaiting approval</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Payment Received</p>
                    <p className="text-xs text-green-600">$5,200 from TechCorp Inc.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Projects Completed</span>
                  <span className="font-medium">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Words Translated</span>
                  <span className="font-medium">125,430</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Client Satisfaction</span>
                  <span className="font-medium">98.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">On-Time Delivery</span>
                  <span className="font-medium">96.2%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
