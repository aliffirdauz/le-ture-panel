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
  { day: "Mon", humidity: 58, temperature: 22, waterUsage: 2.1, runtime: 8 },
  { day: "Tue", humidity: 62, temperature: 23, waterUsage: 2.3, runtime: 9 },
  { day: "Wed", humidity: 55, temperature: 21, waterUsage: 1.9, runtime: 7 },
  { day: "Thu", humidity: 68, temperature: 24, waterUsage: 2.5, runtime: 10 },
  { day: "Fri", humidity: 65, temperature: 23, waterUsage: 2.2, runtime: 8.5 },
  { day: "Sat", humidity: 60, temperature: 22, waterUsage: 2.0, runtime: 8 },
  { day: "Sun", humidity: 58, temperature: 21, waterUsage: 1.8, runtime: 7.5 },
]

const monthlyData = [
  { month: "Jan", humidity: 62, temperature: 22, waterUsage: 15.8 },
  { month: "Feb", humidity: 58, temperature: 21, waterUsage: 14.2 },
  { month: "Mar", humidity: 65, temperature: 23, waterUsage: 16.5 },
  { month: "Apr", humidity: 68, temperature: 24, waterUsage: 17.2 },
  { month: "May", humidity: 70, temperature: 25, waterUsage: 18.0 },
  { month: "Jun", humidity: 67, temperature: 24, waterUsage: 17.5 },
]

const deviceDistribution = [
  { name: "Living Room", value: 35, color: "#8b5cf6" },
  { name: "Bedroom", value: 25, color: "#06b6d4" },
  { name: "Office", value: 20, color: "#10b981" },
  { name: "Kids Room", value: 20, color: "#f59e0b" },
]

export function Analytics() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500">Le-ture performance insights and trends</p>
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
                <p className="text-sm text-gray-500">Avg Humidity</p>
                <p className="text-2xl font-bold">62%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-500">+8% from last week</span>
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
                <p className="text-2xl font-bold">22.5°C</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-blue-500" />
                  <span className="text-xs text-blue-500">+2% from last week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Water Usage</p>
                <p className="text-2xl font-bold">15.8L</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-500">-5% from last week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Runtime</p>
                <p className="text-2xl font-bold">58h</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-orange-500" />
                  <span className="text-xs text-orange-500">+12% from last week</span>
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
                    <Line type="monotone" dataKey="humidity" stroke="#8b5cf6" strokeWidth={2} name="Humidity" />
                    <Line type="monotone" dataKey="temperature" stroke="#06b6d4" strokeWidth={2} name="Temperature" />
                    <Line type="monotone" dataKey="waterUsage" stroke="#10b981" strokeWidth={2} name="Water Usage" />
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
            <CardTitle>Weekly Humidity Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Bar dataKey="humidity" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
