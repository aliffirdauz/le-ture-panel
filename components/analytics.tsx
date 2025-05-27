"use client"

import { useState } from "react"
import { Calendar, Download, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const weeklyData = [
  { day: "Mon", co2: 420, humidity: 48, methane: 160, temperature: 75 },
  { day: "Tue", co2: 450, humidity: 52, methane: 180, temperature: 78 },
  { day: "Wed", co2: 380, humidity: 45, methane: 140, temperature: 72 },
  { day: "Thu", co2: 520, humidity: 58, methane: 220, temperature: 82 },
  { day: "Fri", co2: 480, humidity: 55, methane: 200, temperature: 80 },
  { day: "Sat", co2: 350, humidity: 42, methane: 120, temperature: 70 },
  { day: "Sun", co2: 320, humidity: 40, methane: 110, temperature: 68 },
]

const monthlyData = [
  { month: "Jan", co2: 420, humidity: 48, methane: 160 },
  { month: "Feb", co2: 380, humidity: 45, methane: 140 },
  { month: "Mar", co2: 450, humidity: 52, methane: 180 },
  { month: "Apr", co2: 480, humidity: 55, methane: 200 },
  { month: "May", co2: 520, humidity: 58, methane: 220 },
  { month: "Jun", co2: 490, humidity: 56, methane: 210 },
]

const deviceDistribution = [
  { name: "AQ Generator", value: 35, color: "#8b5cf6" },
  { name: "TempCorp", value: 25, color: "#06b6d4" },
  { name: "HumidityPro", value: 20, color: "#10b981" },
  { name: "MethaneSense", value: 20, color: "#f59e0b" },
]

export function Analytics() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500">Detailed insights and trends</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg CO2 Level</p>
                <p className="text-2xl font-bold">445 PPM</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-red-500" />
                  <span className="text-xs text-red-500">+12% from last week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Humidity</p>
                <p className="text-2xl font-bold">50%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-500">-3% from last week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Temperature</p>
                <p className="text-2xl font-bold">75°F</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-orange-500" />
                  <span className="text-xs text-orange-500">+5% from last week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Alert Rate</p>
                <p className="text-2xl font-bold">8.5%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-500">-15% from last week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trends Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Environmental Trends</CardTitle>
                <Tabs value={timeRange} onValueChange={setTimeRange}>
                  <TabsList>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeRange === "week" ? weeklyData : monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey={timeRange === "week" ? "day" : "month"} axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Line type="monotone" dataKey="co2" stroke="#8b5cf6" strokeWidth={2} name="CO2" />
                    <Line type="monotone" dataKey="humidity" stroke="#06b6d4" strokeWidth={2} name="Humidity" />
                    <Line type="monotone" dataKey="methane" stroke="#10b981" strokeWidth={2} name="Methane" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device Distribution */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Device Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={deviceDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                      {deviceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {deviceDistribution.map((device) => (
                  <div key={device.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                      <span className="text-sm">{device.name}</span>
                    </div>
                    <span className="text-sm font-medium">{device.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Bar dataKey="co2" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
