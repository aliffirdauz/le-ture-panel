"use client"

import { useState } from "react"
import { Save, Bell, Shield, Database, Wifi, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      smsAlerts: false,
      alertThresholds: {
        co2: 500,
        humidity: 60,
        temperature: 85,
        methane: 200,
      },
    },
    system: {
      dataRetention: "90",
      backupFrequency: "daily",
      timezone: "UTC-5",
      language: "en",
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: "30",
      passwordExpiry: "90",
    },
  })

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved:", settings)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">Manage your system preferences and configurations</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
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

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-alerts" className="text-base font-medium">
                      SMS Alerts
                    </Label>
                    <p className="text-sm text-gray-500">Receive critical alerts via SMS</p>
                  </div>
                  <Switch
                    id="sms-alerts"
                    checked={settings.notifications.smsAlerts}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        notifications: { ...prev.notifications, smsAlerts: checked },
                      }))
                    }
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">Email Recipients</Label>
                  <Textarea
                    placeholder="Enter email addresses separated by commas"
                    defaultValue="admin@company.com, alerts@company.com"
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
                    <Label htmlFor="co2-threshold">CO2 Threshold (PPM)</Label>
                    <Input
                      id="co2-threshold"
                      type="number"
                      value={settings.notifications.alertThresholds.co2}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            alertThresholds: {
                              ...prev.notifications.alertThresholds,
                              co2: Number.parseInt(e.target.value),
                            },
                          },
                        }))
                      }
                    />
                  </div>

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
                    <Label htmlFor="temperature-threshold">Temperature Threshold (°F)</Label>
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
                    <Label htmlFor="methane-threshold">Methane Threshold (PPM)</Label>
                    <Input
                      id="methane-threshold"
                      type="number"
                      value={settings.notifications.alertThresholds.methane}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            alertThresholds: {
                              ...prev.notifications.alertThresholds,
                              methane: Number.parseInt(e.target.value),
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
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select
                      value={settings.system.backupFrequency}
                      onValueChange={(value) =>
                        setSettings((prev) => ({
                          ...prev,
                          system: { ...prev.system, backupFrequency: value },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
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
                        <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="UTC+0">UTC</SelectItem>
                        <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={settings.system.language}
                      onValueChange={(value) =>
                        setSettings((prev) => ({
                          ...prev,
                          system: { ...prev.system, language: value },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
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

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Select
                      value={settings.security.sessionTimeout}
                      onValueChange={(value) =>
                        setSettings((prev) => ({
                          ...prev,
                          security: { ...prev.security, sessionTimeout: value },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                    <Select
                      value={settings.security.passwordExpiry}
                      onValueChange={(value) =>
                        setSettings((prev) => ({
                          ...prev,
                          security: { ...prev.security, passwordExpiry: value },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button variant="outline">Change Password</Button>
                  <Button variant="outline">Download Security Log</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="w-5 h-5" />
                  External Integrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="w-8 h-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Email Service</h4>
                        <p className="text-sm text-gray-500">SMTP configuration for email alerts</p>
                      </div>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Database className="w-8 h-8 text-green-600" />
                      <div>
                        <h4 className="font-medium">Database Backup</h4>
                        <p className="text-sm text-gray-500">External database backup service</p>
                      </div>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="w-8 h-8 text-orange-600" />
                      <div>
                        <h4 className="font-medium">Slack Integration</h4>
                        <p className="text-sm text-gray-500">Send alerts to Slack channels</p>
                      </div>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">API Configuration</Label>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Enter your API key"
                      defaultValue="••••••••••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input id="webhook-url" placeholder="https://your-webhook-url.com" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
