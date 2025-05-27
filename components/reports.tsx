"use client"

import { useState } from "react"
import { Download, FileText, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const reports = [
  {
    id: 1,
    name: "Weekly Air Quality Summary",
    type: "Weekly Report",
    generatedDate: "2025-01-20",
    period: "Jan 13 - Jan 20, 2025",
    status: "completed",
    size: "2.4 MB",
    devices: ["AQ Generator", "TempCorp"],
    format: "PDF",
  },
  {
    id: 2,
    name: "Monthly Environmental Analysis",
    type: "Monthly Report",
    generatedDate: "2025-01-01",
    period: "December 2024",
    status: "completed",
    size: "5.8 MB",
    devices: ["All Devices"],
    format: "PDF",
  },
  {
    id: 3,
    name: "Alert Summary Report",
    type: "Alert Report",
    generatedDate: "2025-01-19",
    period: "Jan 1 - Jan 19, 2025",
    status: "completed",
    size: "1.2 MB",
    devices: ["AQ Generator", "MethaneSense"],
    format: "Excel",
  },
  {
    id: 4,
    name: "Device Performance Analysis",
    type: "Performance Report",
    generatedDate: "2025-01-18",
    period: "Jan 1 - Jan 18, 2025",
    status: "processing",
    size: "-",
    devices: ["All Devices"],
    format: "PDF",
  },
  {
    id: 5,
    name: "Compliance Report Q4 2024",
    type: "Compliance Report",
    generatedDate: "2024-12-31",
    period: "Q4 2024",
    status: "completed",
    size: "3.7 MB",
    devices: ["All Devices"],
    format: "PDF",
  },
]

const reportTemplates = [
  {
    id: 1,
    name: "Daily Summary",
    description: "Daily overview of all environmental metrics",
    frequency: "Daily",
  },
  {
    id: 2,
    name: "Weekly Analysis",
    description: "Comprehensive weekly analysis with trends",
    frequency: "Weekly",
  },
  {
    id: 3,
    name: "Monthly Report",
    description: "Detailed monthly environmental report",
    frequency: "Monthly",
  },
  {
    id: 4,
    name: "Alert Summary",
    description: "Summary of all alerts and incidents",
    frequency: "On-demand",
  },
]

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || report.type.toLowerCase().includes(filterType.toLowerCase())
    const matchesStatus = filterStatus === "all" || report.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500">Generate and manage environmental reports</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {reports.filter((r) => r.status === "completed").length}
            </div>
            <p className="text-sm text-gray-500">Completed Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {reports.filter((r) => r.status === "processing").length}
            </div>
            <p className="text-sm text-gray-500">Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">12</div>
            <p className="text-sm text-gray-500">This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {reports.reduce((sum, r) => sum + (r.size !== "-" ? Number.parseFloat(r.size) : 0), 0).toFixed(1)} MB
            </div>
            <p className="text-sm text-gray-500">Total Size</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Reports</CardTitle>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-48"
                  />
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="alert">Alert</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div key={report.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{report.name}</h3>
                          <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                            {report.status}
                          </Badge>
                          <Badge variant="outline">{report.format}</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">{report.type}</p>
                        <p className="text-sm text-gray-500 mb-2">Period: {report.period}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span>Generated: {report.generatedDate}</span>
                          <span>Size: {report.size}</span>
                          <span>
                            Devices: {Array.isArray(report.devices) ? report.devices.join(", ") : report.devices}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" disabled={report.status !== "completed"}>
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Templates */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTemplates.map((template) => (
                  <div key={template.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{template.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {template.frequency}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{template.description}</p>
                    <Button size="sm" className="w-full">
                      Generate Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Scheduled Reports */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Weekly Summary</p>
                    <p className="text-xs text-gray-500">Every Monday at 9:00 AM</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Monthly Report</p>
                    <p className="text-xs text-gray-500">1st of every month</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Manage Schedules
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
