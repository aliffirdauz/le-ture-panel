"use client"

import { useState } from "react"
import { Save, Bell, Shield, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      smsAlerts: false,
      alertThresholds: {
        humidity: 70,
        temperature: 28,
        waterLevel: 20,
        filterLife: 30,
      },
    },
    system: {
      dataRetention: "90",
      backupFrequency: "daily",
      timezone: "UTC+7",
      language: "en",
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: "30",
      passwordExpiry: "90",
    },
  })

  const handleSave = () => {
    console.log("Settings saved:", settings)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">Manage your Le-ture system preferences</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-alerts" className="text-base font-medium">
                      Email Alerts
                    </Label>
                    <p className="text-sm text-gray-500">Receive alert notifications via email</p>
                  </div>
                  <Switch
                    id="email-alerts"
                    checked={settings.notifications.emailAlerts}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        notifications: { ...prev.notifications, emailAlerts: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications" className="text-base font-medium">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        notifications: { ...prev.notifications, pushNotifications: checked },
                      }))
                    }
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">Email Recipients</Label>
                  <Textarea
                    placeholder="Enter email addresses separated by commas"
                    defaultValue="admin@le-ture.com, alerts@le-ture.com"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="thresholds">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Thresholds</CardTitle>
                <p className="text-sm text-gray-500">Set the threshold values that will trigger alerts</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="humidity-threshold">Humidity Threshold (%)</Label>
                    <Input
                      id="humidity-threshold"
                      type="number"
                      value={settings.notifications.alertThresholds.humidity}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            alertThresholds: {
                              ...prev.notifications.alertThresholds,
                              humidity: Number.parseInt(e.target.value),
                            },
                          },
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temperature-threshold">Temperature Threshold (°C)</Label>
                    <Input
                      id="temperature-threshold"
                      type="number"
                      value={settings.notifications.alertThresholds.temperature}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            alertThresholds: {
                              ...prev.notifications.alertThresholds,
                              temperature: Number.parseInt(e.target.value),
                            },
                          },
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="water-threshold">Water Level Threshold (%)</Label>
                    <Input
                      id="water-threshold"
                      type="number"
                      value={settings.notifications.alertThresholds.waterLevel}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            alertThresholds: {
                              ...prev.notifications.alertThresholds,
                              waterLevel: Number.parseInt(e.target.value),
                            },
                          },
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="filter-threshold">Filter Life Alert (days)</Label>
                    <Input
                      id="filter-threshold"
                      type="number"
                      value={settings.notifications.alertThresholds.filterLife}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            alertThresholds: {
                              ...prev.notifications.alertThresholds,
                              filterLife: Number.parseInt(e.target.value),
                            },
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="data-retention">Data Retention (days)</Label>
                    <Select
                      value={settings.system.dataRetention}
                      onValueChange={(value) =>
                        setSettings((prev) => ({
                          ...prev,
                          system: { ...prev.system, dataRetention: value },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={settings.system.timezone}
                      onValueChange={(value) =>
                        setSettings((prev) => ({
                          ...prev,
                          system: { ...prev.system, timezone: value },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC+7">WIB (UTC+7)</SelectItem>
                        <SelectItem value="UTC+8">WITA (UTC+8)</SelectItem>
                        <SelectItem value="UTC+9">WIT (UTC+9)</SelectItem>
                        <SelectItem value="UTC+0">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor" className="text-base font-medium">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        security: { ...prev.security, twoFactorAuth: checked },
                      }))
                    }
                  />
                </div>

                <div className="space-y-4">
                  <Button variant="outline">Change Password</Button>
                  <Button variant="outline">Download Security Log</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
