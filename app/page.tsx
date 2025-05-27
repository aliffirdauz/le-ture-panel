"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { Devices } from "@/components/devices"
import { Analytics } from "@/components/analytics"
import { Settings } from "@/components/settings"
import { Reports } from "@/components/reports"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "devices":
        return <Devices />
      case "analytics":
        return <Analytics />
      case "reports":
        return <Reports />
      case "settings":
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  )
}
