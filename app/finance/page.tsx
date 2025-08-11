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
import {
  Plus,
  Search,
  Filter,
  DollarSign,
  FileText,
  Download,
  Eye,
  Edit,
  ArrowLeft,
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

export default function FinancePage() {
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const invoices = [
    {
      id: "INV-001",
      clientName: "TechCorp Inc.",
      projectTitle: "Website Translation",
      amount: 650.4,
      status: "Paid",
      dueDate: "2024-01-15",
      issueDate: "2024-01-01",
      paymentDate: "2024-01-10",
      type: "Invoice",
      description: "Translation services for corporate website",
      items: [{ description: "English to Spanish translation", quantity: 5420, rate: 0.12, amount: 650.4 }],
    },
    {
      id: "INV-002",
      clientName: "Global Marketing",
      projectTitle: "Marketing Campaign",
      amount: 480.0,
      status: "Pending",
      dueDate: "2024-01-25",
      issueDate: "2024-01-10",
      paymentDate: null,
      type: "Invoice",
      description: "Marketing materials translation",
      items: [{ description: "English to French translation", quantity: 3200, rate: 0.15, amount: 480.0 }],
    },
    {
      id: "INV-003",
      clientName: "Legal Associates",
      projectTitle: "Legal Documents",
      amount: 1602.0,
      status: "Paid",
      dueDate: "2024-01-20",
      issueDate: "2024-01-05",
      paymentDate: "2024-01-18",
      type: "Invoice",
      description: "Legal contract translation",
      items: [{ description: "German to English translation", quantity: 8900, rate: 0.18, amount: 1602.0 }],
    },
    {
      id: "EXP-001",
      clientName: "Maria Rodriguez",
      projectTitle: "Translator Payment",
      amount: -390.24,
      status: "Paid",
      dueDate: "2024-01-15",
      issueDate: "2024-01-15",
      paymentDate: "2024-01-15",
      type: "Expense",
      description: "Payment to translator for TechCorp project",
      items: [{ description: "Translation services", quantity: 5420, rate: 0.072, amount: 390.24 }],
    },
    {
      id: "INV-004",
      clientName: "MedTech Solutions",
      projectTitle: "Medical Documentation",
      amount: 1850.0,
      status: "Overdue",
      dueDate: "2024-01-05",
      issueDate: "2023-12-20",
      paymentDate: null,
      type: "Invoice",
      description: "Medical device documentation translation",
      items: [{ description: "English to Japanese translation", quantity: 8400, rate: 0.22, amount: 1850.0 }],
    },
  ]

  const expenses = [
    {
      id: "EXP-001",
      description: "Translator Payment - Maria Rodriguez",
      amount: 390.24,
      category: "Translator Fees",
      date: "2024-01-15",
      status: "Paid",
      project: "TechCorp Website",
    },
    {
      id: "EXP-002",
      description: "CAT Tool License",
      amount: 299.0,
      category: "Software",
      date: "2024-01-01",
      status: "Paid",
      project: "General",
    },
    {
      id: "EXP-003",
      description: "Translator Payment - Jean Dubois",
      amount: 288.0,
      category: "Translator Fees",
      date: "2024-01-12",
      status: "Pending",
      project: "Marketing Campaign",
    },
  ]

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status.toLowerCase() === statusFilter
    const matchesType = typeFilter === "all" || invoice.type.toLowerCase() === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const totalRevenue = invoices
    .filter((inv) => inv.type === "Invoice" && inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0)
  const pendingRevenue = invoices
    .filter((inv) => inv.type === "Invoice" && inv.status === "Pending")
    .reduce((sum, inv) => sum + inv.amount, 0)
  const overdueRevenue = invoices
    .filter((inv) => inv.type === "Invoice" && inv.status === "Overdue")
    .reduce((sum, inv) => sum + inv.amount, 0)
  const totalExpenses = expenses.filter((exp) => exp.status === "Paid").reduce((sum, exp) => sum + exp.amount, 0)

  if (selectedInvoice) {
    return <InvoiceDetailView invoice={selectedInvoice} onBack={() => setSelectedInvoice(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader currentPage="finance" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Finance</h2>
            <p className="text-gray-600">Manage invoices, payments, and financial reporting</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription>Generate an invoice for completed translation work</DialogDescription>
              </DialogHeader>
              <NewInvoiceForm />
            </DialogContent>
          </Dialog>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">${pendingRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {invoices.filter((inv) => inv.status === "Pending").length} invoices
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${overdueRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {invoices.filter((inv) => inv.status === "Overdue").length} overdue invoices
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">${totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">+8.2%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="invoices" className="space-y-6">
          <TabsList>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="reports">Financial Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices" className="space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search invoices, clients, or projects..."
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
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="invoice">Invoices</SelectItem>
                      <SelectItem value="expense">Expenses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Invoices List */}
            <div className="space-y-4">
              {filteredInvoices.map((invoice) => (
                <Card key={invoice.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            {invoice.type === "Invoice" ? (
                              <FileText className="h-5 w-5 text-blue-600" />
                            ) : (
                              <DollarSign className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{invoice.id}</h3>
                          <p className="text-sm text-gray-600">{invoice.clientName}</p>
                          <p className="text-sm text-gray-500">{invoice.projectTitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            {invoice.type === "Expense" ? "-" : ""}${Math.abs(invoice.amount).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                        </div>

                        <Badge
                          variant={
                            invoice.status === "Paid"
                              ? "default"
                              : invoice.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {invoice.status}
                        </Badge>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedInvoice(invoice)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Expense Tracking</CardTitle>
                <CardDescription>Monitor translator payments and business expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">{expense.description}</p>
                          <p className="text-sm text-gray-600">
                            {expense.category} • {expense.project}
                          </p>
                          <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-red-600">-${expense.amount.toLocaleString()}</p>
                        <Badge variant={expense.status === "Paid" ? "default" : "secondary"}>{expense.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Revenue (Paid)</span>
                      <span className="font-semibold text-green-600">${totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending Revenue</span>
                      <span className="font-semibold text-yellow-600">${pendingRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overdue Revenue</span>
                      <span className="font-semibold text-red-600">${overdueRevenue.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Total Expected</span>
                        <span className="font-bold">
                          ${(totalRevenue + pendingRevenue + overdueRevenue).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Translator Fees</span>
                      <span className="font-semibold">
                        $
                        {expenses
                          .filter((e) => e.category === "Translator Fees" && e.status === "Paid")
                          .reduce((sum, e) => sum + e.amount, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Software & Tools</span>
                      <span className="font-semibold">
                        $
                        {expenses
                          .filter((e) => e.category === "Software" && e.status === "Paid")
                          .reduce((sum, e) => sum + e.amount, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Total Expenses</span>
                        <span className="font-bold text-red-600">${totalExpenses.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span className="font-medium text-lg">Net Profit</span>
                        <span className="font-bold text-lg text-green-600">
                          ${(totalRevenue - totalExpenses).toLocaleString()}
                        </span>
                      </div>
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

function NewInvoiceForm() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
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
        <div>
          <Label htmlFor="project">Project</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="prj001">Website Translation</SelectItem>
              <SelectItem value="prj002">Marketing Campaign</SelectItem>
              <SelectItem value="prj003">Legal Documents</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input id="dueDate" type="date" />
        </div>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" type="number" step="0.01" placeholder="0.00" />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Invoice description and line items" />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline">Save Draft</Button>
        <Button>Create & Send Invoice</Button>
      </div>
    </div>
  )
}

function InvoiceDetailView({ invoice, onBack }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader currentPage="finance" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Finance
          </Button>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{invoice.id}</h2>
              <p className="text-gray-600">
                {invoice.clientName} • {invoice.projectTitle}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Invoice Details</CardTitle>
                <CardDescription>{invoice.description}</CardDescription>
              </div>
              <Badge
                variant={
                  invoice.status === "Paid" ? "default" : invoice.status === "Pending" ? "secondary" : "destructive"
                }
                className="text-lg px-4 py-2"
              >
                {invoice.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Bill To:</h4>
                <p className="text-gray-700">{invoice.clientName}</p>
              </div>
              <div className="text-right">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Issue Date:</span>
                    <span>{new Date(invoice.issueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Due Date:</span>
                    <span>{new Date(invoice.dueDate).toLocaleDateString()}</span>
                  </div>
                  {invoice.paymentDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Date:</span>
                      <span>{new Date(invoice.paymentDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Line Items</h4>
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
                  <span>Description</span>
                  <span className="text-right">Quantity</span>
                  <span className="text-right">Rate</span>
                  <span className="text-right">Amount</span>
                </div>
                {invoice.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 text-sm py-2">
                    <span>{item.description}</span>
                    <span className="text-right">{item.quantity.toLocaleString()}</span>
                    <span className="text-right">${item.rate}</span>
                    <span className="text-right">${item.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Amount:</span>
                    <span>${Math.abs(invoice.amount).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {invoice.status === "Pending" && (
              <div className="border-t pt-6">
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Send Reminder</Button>
                  <Button>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Paid
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
