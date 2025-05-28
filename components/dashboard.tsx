"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Bell, Calendar, MoreHorizontal, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
  { time: "06:00", humidity: 45, temperature: 22, waterLevel: 95, mistOutput: 60 },
  { time: "07:00", humidity: 48, temperature: 23, waterLevel: 92, mistOutput: 65 },
  { time: "08:00", humidity: 52, temperature: 24, waterLevel: 89, mistOutput: 70 },
  { time: "09:00", humidity: 55, temperature: 25, waterLevel: 86, mistOutput: 75 },
  { time: "10:00", humidity: 58, temperature: 24, waterLevel: 83, mistOutput: 80 },
  { time: "11:00", humidity: 60, temperature: 24, waterLevel: 80, mistOutput: 85 },
  { time: "12:00", humidity: 65, temperature: 24, waterLevel: 77, mistOutput: 90 },
]

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Water level is getting low (20%)",
    time: "Today 09:30",
    device: "Le-ture Unit #1",
  },
  {
    id: 2,
    type: "info",
    title: "Optimal humidity reached (65%)",
    time: "Today 08:45",
    device: "Le-ture Unit #1",
  },
  {
    id: 3,
    type: "warning",
    title: "Filter replacement due in 3 days",
    time: "Yesterday",
    device: "Le-ture Unit #1",
  },
  {
    id: 4,
    type: "info",
    title: "Auto-mode activated",
    time: "2 Days ago",
    device: "Le-ture Unit #1",
  },
]

export default function Dashboard() {
  const [selectedMetric, setSelectedMetric] = useState("humidity")

  return (
    <div className="p-6 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">DASHBOARD</h1>
          <p className="text-gray-500">Le-ture Natural Humidifier Control</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            May 2025
          </Button>
          <Button variant="ghost" size="sm">
            <Bell className="w-5 h-5" />
            <Badge variant="destructive" className="ml-1 px-1 min-w-[20px] h-5">
              4
            </Badge>
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                    <span className="font-semibold text-lg">Le-ture Humidifier</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant={selectedMetric === "humidity" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedMetric("humidity")}
                  >
                    Humidity
                  </Button>
                  <Button
                    variant={selectedMetric === "temperature" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedMetric("temperature")}
                  >
                    Temperature
                  </Button>
                  <Button
                    variant={selectedMetric === "waterLevel" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedMetric("waterLevel")}
                  >
                    Water Level
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
                    <Area
                      type="monotone"
                      dataKey={selectedMetric}
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      fill="url(#gradient)"
                      fillOpacity={0.1}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Humidity Level</p>
                    <p className="text-2xl font-bold">65%</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "65%" }} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Temperature</p>
                    <p className="text-2xl font-bold">24°C</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "70%" }} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Water Level</p>
                    <p className="text-2xl font-bold">85%</p>
                  </div>
                  <TrendingDown className="w-5 h-5 text-orange-500" />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: "85%" }} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Mist Output</p>
                    <p className="text-2xl font-bold">High</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: "90%" }} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Device Specifications */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Le-ture Device Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Device Model</p>
                  <p className="font-medium">Le-ture Natural Humidifier</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Power Consumption</p>
                  <p className="font-medium">25W</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Water Tank Capacity</p>
                  <p className="font-medium">50L</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Coverage Area</p>
                  <p className="font-medium">40-60 m²</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mist Technology</p>
                  <p className="font-medium">Ultrasonic</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Auto Shut-off</p>
                  <p className="font-medium">Enabled</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Sidebar */}
        <div className="lg:col-span-1">
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>System Alerts</CardTitle>
                <Badge variant="destructive">4</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-3 rounded-lg border border-gray-200">
                  <div className="flex items-start gap-2">
                    <AlertTriangle
                      className={`w-4 h-4 mt-0.5 ${alert.type === "error" ? "text-red-500" : "text-orange-500"}`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      <p className="text-xs text-gray-400">{alert.device}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
