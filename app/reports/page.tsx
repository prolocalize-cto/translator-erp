"use client"

import { useState } from "react"
import SharedHeader from "@/components/shared-header" // Import shared header component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Calendar, TrendingUp, DollarSign, FileText, Users, PieChart } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("last-30-days")
  const [reportType, setReportType] = useState("overview")

  // Sample data for charts
  const revenueData = [
    { month: "Jan", revenue: 12400, expenses: 8200, profit: 4200 },
    { month: "Feb", revenue: 15600, expenses: 9800, profit: 5800 },
    { month: "Mar", revenue: 18200, expenses: 11200, profit: 7000 },
    { month: "Apr", revenue: 16800, expenses: 10400, profit: 6400 },
    { month: "May", revenue: 21500, expenses: 13200, profit: 8300 },
    { month: "Jun", revenue: 19200, expenses: 12100, profit: 7100 },
  ]

  const projectStatusData = [
    { name: "Completed", value: 45, color: "#22c55e" },
    { name: "In Progress", value: 23, color: "#3b82f6" },
    { name: "Review", value: 12, color: "#f59e0b" },
    { name: "On Hold", value: 8, color: "#ef4444" },
  ]

  const languagePairData = [
    { pair: "EN→ES", projects: 28, revenue: 15400 },
    { pair: "EN→FR", projects: 22, revenue: 12800 },
    { pair: "DE→EN", projects: 18, revenue: 18200 },
    { pair: "EN→JA", projects: 12, revenue: 16800 },
    { pair: "FR→ES", projects: 8, revenue: 6400 },
  ]

  const translatorPerformanceData = [
    { name: "Maria Rodriguez", projects: 12, rating: 4.9, earnings: 8450 },
    { name: "Jean Dubois", projects: 8, rating: 4.7, earnings: 5200 },
    { name: "Hans Mueller", projects: 15, rating: 4.8, earnings: 12300 },
    { name: "Yuki Tanaka", projects: 6, rating: 4.9, earnings: 4800 },
  ]

  const clientRevenueData = [
    { client: "TechCorp Inc.", revenue: 25400, projects: 8 },
    { client: "Global Marketing", revenue: 18200, projects: 6 },
    { client: "Legal Associates", revenue: 32100, projects: 12 },
    { client: "MedTech Solutions", revenue: 12300, projects: 4 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader currentPage="reports" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Reports & Analytics</h2>
            <p className="text-gray-600">Comprehensive business insights and performance metrics</p>
          </div>
          <div className="flex space-x-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-48">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs value={reportType} onValueChange={setReportType} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="translators">Translators</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$88,200</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12.5%</span> from last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-blue-600">+3</span> new this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Translators</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">100%</span> availability rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Project Value</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$3,834</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+8.2%</span> from last period
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Revenue Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: { label: "Revenue", color: "#3b82f6" },
                      profit: { label: "Profit", color: "#22c55e" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Project Status Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      completed: { label: "Completed", color: "#22c55e" },
                      inProgress: { label: "In Progress", color: "#3b82f6" },
                      review: { label: "Review", color: "#f59e0b" },
                      onHold: { label: "On Hold", color: "#ef4444" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={projectStatusData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {projectStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue vs Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: { label: "Revenue", color: "#3b82f6" },
                      expenses: { label: "Expenses", color: "#ef4444" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="revenue" fill="#3b82f6" />
                        <Bar dataKey="expenses" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clientRevenueData.map((client, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{client.client}</p>
                          <p className="text-sm text-gray-600">{client.projects} projects</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${client.revenue.toLocaleString()}</p>
                          <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${(client.revenue / Math.max(...clientRevenueData.map((c) => c.revenue))) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Language Pair Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {languagePairData.map((pair, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{pair.pair}</p>
                          <p className="text-sm text-gray-600">{pair.projects} projects</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${pair.revenue.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">${(pair.revenue / pair.projects).toFixed(0)} avg</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600">94.2%</div>
                      <p className="text-gray-600">On-time completion rate</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Completed on time</span>
                        <span>85 projects</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                          style={{ 
                            '--completed-width': '94.2%',
                            width: 'var(--completed-width)'
                          } as React.CSSProperties}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delayed projects</span>
                        <span>5 projects</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-300" 
                          style={{ 
                            '--delayed-width': '5.8%',
                            width: 'var(--delayed-width)'
                          } as React.CSSProperties}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="translators" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Translator Performance</CardTitle>
                <CardDescription>Performance metrics for your translator network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {translatorPerformanceData.map((translator, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Users className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">{translator.name}</p>
                          <p className="text-sm text-gray-600">{translator.projects} projects completed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="text-sm text-gray-600">Rating</p>
                            <p className="font-bold">{translator.rating}/5.0</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Earnings</p>
                            <p className="font-bold">${translator.earnings.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Clients by Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: { label: "Revenue", color: "#3b82f6" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={clientRevenueData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="client" type="category" width={100} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="revenue" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600">4.7</div>
                      <p className="text-gray-600">Average client rating</p>
                    </div>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-3">
                          <span className="text-sm w-8">{rating}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                              style={{
                                '--rating-width': `${rating === 5 ? 65 : rating === 4 ? 25 : rating === 3 ? 8 : rating === 2 ? 2 : 0}%`,
                                width: 'var(--rating-width)'
                              } as React.CSSProperties}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-8">
                            {rating === 5
                              ? "65%"
                              : rating === 4
                                ? "25%"
                                : rating === 3
                                  ? "8%"
                                  : rating === 2
                                    ? "2%"
                                    : "0%"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
