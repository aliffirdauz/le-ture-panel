"use client"

import { useState } from "react"
import { Bell, MoreHorizontal, Calendar, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts"

const chartData = [
  { time: "06:00", co2: 280, humidity: 45, methane: 120, temperature: 72 },
  { time: "07:00", co2: 320, humidity: 48, methane: 140, temperature: 74 },
  { time: "08:00", co2: 380, humidity: 52, methane: 160, temperature: 76 },
  { time: "09:00", co2: 450, humidity: 55, methane: 180, temperature: 78 },
  { time: "10:00", co2: 520, humidity: 58, methane: 200, temperature: 82 },
  { time: "11:00", co2: 580, humidity: 60, methane: 220, temperature: 84 },
  { time: "12:00", co2: 450, humidity: 50, methane: 180, temperature: 86 },
]

const alerts = [
  {
    id: 1,
    type: "error",
    title: "Co2 level exceeded the limit (500 PPM)",
    time: "Today 09:30",
    device: "AQ Generator",
  },
  {
    id: 2,
    type: "warning",
    title: "Temperature level exceeded the limit (80°F)",
    time: "2 Days ago",
    device: "TempCorp",
  },
  {
    id: 3,
    type: "error",
    title: "Methane level exceeded the limit (220 PPM)",
    time: "2 Days ago",
    device: "AQ Generator",
  },
  {
    id: 4,
    type: "warning",
    title: "Humidity level exceeded the limit (55%)",
    time: "3 Days ago",
    device: "AQ Generator",
  },
]

export function Dashboard() {
  const [selectedMetric, setSelectedMetric] = useState("co2")

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">DASHBOARD</h1>
            <p className="text-gray-500">AQ Generator</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              January 2025
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
                      <span className="font-semibold text-lg">AQ Generator</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      variant={selectedMetric === "co2" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedMetric("co2")}
                    >
                      Carbon Dioxide
                    </Button>
                    <Button
                      variant={selectedMetric === "humidity" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedMetric("humidity")}
                    >
                      Humidity
                    </Button>
                    <Button
                      variant={selectedMetric === "methane" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedMetric("methane")}
                    >
                      Methane
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
                      <p className="text-sm text-gray-500">Carbon Dioxide (Co2)</p>
                      <p className="text-2xl font-bold">450 PPM</p>
                    </div>
                    <TrendingUp className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "75%" }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Humidity</p>
                      <p className="text-2xl font-bold">50%</p>
                    </div>
                    <TrendingDown className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "50%" }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Methane (CH4)</p>
                      <p className="text-2xl font-bold">180 PPM</p>
                    </div>
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "60%" }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Temperature</p>
                      <p className="text-2xl font-bold">86°F</p>
                    </div>
                    <TrendingUp className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "86%" }} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Device Specifications */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Device Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Device Name</p>
                    <p className="font-medium">AQ Generator</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">System Voltage</p>
                    <p className="font-medium">24 VDC</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Battery Alternator</p>
                    <p className="font-medium">80 Amps</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cylinder No</p>
                    <p className="font-medium">6</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">IN-line</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Intake Air Method</p>
                    <p className="font-medium">Air-cooled</p>
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
                  <CardTitle>Alerts</CardTitle>
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
    </div>
  )
}
