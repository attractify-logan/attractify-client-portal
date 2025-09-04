import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BarChart3, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Copy,
  Play,
  Eye,
  HelpCircle,
  Zap,
  Users,
  Plus
} from 'lucide-react'
import { Link } from 'react-router-dom'

const AnalyticsSetup = ({ clients = [], selectedClientId = null, onClientSelect = () => {} }) => {
  const [currentClientId, setCurrentClientId] = useState(selectedClientId)
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [measurementId, setMeasurementId] = useState('G-XXXXXXXXXX')

  // Default analytics steps template
  const defaultGA4Steps = [
    { id: 1, title: 'Create GA4 Property', status: 'pending' },
    { id: 2, title: 'Configure Data Stream', status: 'pending' },
    { id: 3, title: 'Install Tracking Code', status: 'pending' },
    { id: 4, title: 'Verify Data Flow', status: 'pending' },
    { id: 5, title: 'Set Up Conversions', status: 'pending' }
  ]

  const defaultGTMSteps = [
    { id: 1, title: 'Create GTM Container', status: 'pending' },
    { id: 2, title: 'Install Container Code', status: 'pending' },
    { id: 3, title: 'Configure GA4 Tag', status: 'pending' },
    { id: 4, title: 'Test & Publish', status: 'pending' }
  ]

  const currentClient = clients.find(client => client.id === currentClientId)
  const ga4Steps = currentClient?.ga4Steps || defaultGA4Steps
  const gtmSteps = currentClient?.gtmSteps || defaultGTMSteps

  const calculateProgress = (steps) => {
    const completedSteps = steps.filter(step => step.status === 'completed').length
    return Math.round((completedSteps / steps.length) * 100)
  }

  const ga4Progress = calculateProgress(ga4Steps)
  const gtmProgress = calculateProgress(gtmSteps)

  const trackingCode = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${measurementId}');
</script>`

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in-progress':
        return <Play className="h-4 w-4 text-blue-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleClientChange = (clientId) => {
    setCurrentClientId(clientId)
    onClientSelect(clientId)
    const client = clients.find(c => c.id === clientId)
    if (client) {
      setWebsiteUrl(client.website || '')
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  if (clients.length === 0) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Setup</h1>
            <p className="text-gray-600 mt-1">Configure Google Analytics 4 and Tag Manager</p>
          </div>
        </div>

        <Card className="text-center py-12">
          <CardContent>
            <BarChart3 className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Clients Yet</h3>
            <p className="text-gray-600 mb-6">
              Add your first client to start setting up their analytics tracking.
            </p>
            <Link to="/clients/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Add First Client
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Setup</h1>
          <p className="text-gray-600 mt-1">Configure Google Analytics 4 and Tag Manager</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Eye className="mr-2 h-4 w-4" />
          View Live Data
        </Button>
      </div>

      {/* Client Selection */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Client Analytics Setup</CardTitle>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Select Client:</label>
              <Select value={currentClientId || ''} onValueChange={handleClientChange}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Choose a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Analytics Overview */}
      {currentClient ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Google Analytics 4 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                    <div>
                      <CardTitle>Google Analytics 4</CardTitle>
                      <CardDescription>Track website performance and user behavior</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {ga4Progress}% Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={ga4Progress} className="mb-4" />
                <div className="space-y-3">
                  {ga4Steps.map((step) => (
                    <div key={step.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(step.status)}
                        <span className="text-sm">{step.title}</span>
                      </div>
                      <Badge variant="outline" className={getStatusColor(step.status)}>
                        {step.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  <Play className="mr-2 h-4 w-4" />
                  Continue Setup
                </Button>
              </CardContent>
            </Card>

            {/* Google Tag Manager */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Settings className="h-6 w-6 text-green-600" />
                    <div>
                      <CardTitle>Google Tag Manager</CardTitle>
                      <CardDescription>Manage tracking codes and marketing tags</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {gtmProgress}% Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={gtmProgress} className="mb-4" />
                <div className="space-y-3">
                  {gtmSteps.map((step) => (
                    <div key={step.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(step.status)}
                        <span className="text-sm">{step.title}</span>
                      </div>
                      <Badge variant="outline" className={getStatusColor(step.status)}>
                        {step.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  <Play className="mr-2 h-4 w-4" />
                  Continue Setup
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Setup Wizard */}
          <Card>
            <CardHeader>
              <CardTitle>Interactive Setup Wizard</CardTitle>
              <CardDescription>Step-by-step guidance for analytics configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="ga4" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="ga4">Google Analytics 4</TabsTrigger>
                  <TabsTrigger value="gtm">Google Tag Manager</TabsTrigger>
                </TabsList>
                
                <TabsContent value="ga4" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Property Configuration</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="website-url">Website URL</Label>
                          <Input
                            id="website-url"
                            value={websiteUrl}
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                            placeholder="https://yourwebsite.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="measurement-id">Measurement ID</Label>
                          <Input
                            id="measurement-id"
                            value={measurementId}
                            onChange={(e) => setMeasurementId(e.target.value)}
                            placeholder="G-XXXXXXXXXX"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="enhanced-measurement" />
                          <Label htmlFor="enhanced-measurement">Enhanced Measurement</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="cross-domain" />
                          <Label htmlFor="cross-domain">Cross-Domain Tracking</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Tracking Code</h3>
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                        <pre>{trackingCode}</pre>
                      </div>
                      <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-600">1. Copy the code above</p>
                        <p className="text-sm text-gray-600">2. Paste it in your website's &lt;head&gt; section</p>
                        <p className="text-sm text-gray-600">3. Click "Verify Installation" below</p>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(trackingCode)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Code
                        </Button>
                        <Button size="sm">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Verify Installation
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="gtm" className="space-y-6">
                  <div className="text-center py-8">
                    <Settings className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Google Tag Manager Setup</h3>
                    <p className="text-gray-600 mb-4">
                      GTM configuration will be available once GA4 setup is completed.
                    </p>
                    <Button variant="outline">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open GTM Console
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Help Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>Quick access to documentation and support resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-16 flex flex-col space-y-2" asChild>
                  <a href="https://support.google.com/analytics/answer/9304153" target="_blank" rel="noopener noreferrer">
                    <HelpCircle className="h-5 w-5" />
                    <span>GA4 Setup Guide</span>
                    <span className="text-xs text-gray-500">Step-by-step instructions</span>
                  </a>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col space-y-2" asChild>
                  <a href="https://support.google.com/tagmanager" target="_blank" rel="noopener noreferrer">
                    <Settings className="h-5 w-5" />
                    <span>GTM Documentation</span>
                    <span className="text-xs text-gray-500">Complete setup guide</span>
                  </a>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col space-y-2">
                  <Zap className="h-5 w-5" />
                  <span>Live Support</span>
                  <span className="text-xs text-gray-500">Get expert assistance</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <BarChart3 className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Client</h3>
            <p className="text-gray-600">
              Choose a client from the dropdown above to configure their analytics setup.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AnalyticsSetup

