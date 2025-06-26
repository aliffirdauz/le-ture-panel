"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Wifi,
  WifiOff,
  Battery,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const devices = [
  {
    id: 1,
    name: "Le-ture Unit #1",
    type: "Natural Humidifier",
    location: "Living Room",
    status: "online",
    battery: 85,
    lastUpdate: "2 minutes ago",
    alerts: 1,
    metrics: {
      humidity: 65,
      temperature: 24,
      waterLevel: 77,
    },
  },
  {
    id: 2,
    name: "Le-ture Unit #2",
    type: "Natural Humidifier",
    location: "Bedroom",
    status: "online",
    battery: 92,
    lastUpdate: "5 minutes ago",
    alerts: 0,
    metrics: {
      humidity: 58,
      temperature: 23,
      waterLevel: 85,
    },
  },
  {
    id: 3,
    name: "Le-ture Unit #3",
    type: "Natural Humidifier",
    location: "Office",
    status: "offline",
    battery: 23,
    lastUpdate: "2 hours ago",
    alerts: 2,
    metrics: {
      humidity: 42,
      temperature: 26,
      waterLevel: 15,
    },
  },
  {
    id: 4,
    name: "Le-ture Unit #4",
    type: "Natural Humidifier",
    location: "Kids Room",
    status: "online",
    battery: 67,
    lastUpdate: "1 minute ago",
    alerts: 0,
    metrics: {
      humidity: 60,
      temperature: 22,
      waterLevel: 90,
    },
  },
];

export default function Devices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || device.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/login");
    }
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Le-ture Devices</h1>
          <p className="text-gray-500">
            Manage your natural humidifier devices
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Device
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterStatus("all")}>
              All Devices
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("online")}>
              Online Only
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("offline")}>
              Offline Only
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Device Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {devices.filter((d) => d.status === "online").length}
            </div>
            <p className="text-sm text-gray-500">Online Devices</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {devices.filter((d) => d.status === "offline").length}
            </div>
            <p className="text-sm text-gray-500">Offline Devices</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {devices.reduce((sum, d) => sum + d.alerts, 0)}
            </div>
            <p className="text-sm text-gray-500">Total Alerts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(
                devices.reduce((sum, d) => sum + d.battery, 0) / devices.length
              )}
              %
            </div>
            <p className="text-sm text-gray-500">Avg Battery</p>
          </CardContent>
        </Card>
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((device) => (
          <Card key={device.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      device.status === "online" ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <div>
                    <CardTitle className="text-lg">{device.name}</CardTitle>
                    <p className="text-sm text-gray-500">{device.type}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Device</DropdownMenuItem>
                    <DropdownMenuItem>Download Data</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Remove Device
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-medium">{device.location}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  <div className="flex items-center gap-2">
                    {device.status === "online" ? (
                      <Wifi className="w-4 h-4 text-green-500" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-red-500" />
                    )}
                    <Badge
                      variant={
                        device.status === "online" ? "default" : "destructive"
                      }
                    >
                      {device.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Battery:</span>
                  <div className="flex items-center gap-2">
                    <Battery
                      className={`w-4 h-4 ${
                        device.battery > 50
                          ? "text-green-500"
                          : device.battery > 20
                          ? "text-orange-500"
                          : "text-red-500"
                      }`}
                    />
                    <span className="font-medium">{device.battery}%</span>
                  </div>
                </div>

                {device.alerts > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Alerts:</span>
                    <Badge variant="destructive">{device.alerts}</Badge>
                  </div>
                )}

                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500 mb-2">
                    Current Readings:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {device.metrics.humidity && (
                      <div>
                        <span className="text-gray-500">Humidity:</span>
                        <span className="font-medium ml-1">
                          {device.metrics.humidity}%
                        </span>
                      </div>
                    )}
                    {device.metrics.temperature && (
                      <div>
                        <span className="text-gray-500">Temp:</span>
                        <span className="font-medium ml-1">
                          {device.metrics.temperature}°C
                        </span>
                      </div>
                    )}
                    {device.metrics.waterLevel && (
                      <div>
                        <span className="text-gray-500">Water:</span>
                        <span className="font-medium ml-1">
                          {device.metrics.waterLevel}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-xs text-gray-400 pt-2">
                  Last update: {device.lastUpdate}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
