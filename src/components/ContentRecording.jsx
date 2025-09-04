import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { 
  Video, 
  Calendar as CalendarIcon,
  Clock, 
  Users,
  Mic,
  Camera,
  Wifi,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Play,
  Settings,
  HelpCircle,
  Plus,
  FileVideo
} from 'lucide-react'

const ContentRecording = ({ sessions = [], qualityStatus = null, clients = [] }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Default quality checklist
  const defaultQualityChecklist = [
    { item: 'Microphone Connected', status: qualityStatus?.microphone || 'unknown', icon: Mic },
    { item: 'Camera Detected', status: qualityStatus?.camera || 'unknown', icon: Camera },
    { item: 'Internet Connection', status: qualityStatus?.internet || 'unknown', icon: Wifi },
    { item: 'Lighting Quality', status: qualityStatus?.lighting || 'unknown', icon: Settings }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getQualityColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600'
      case 'good': return 'text-blue-600'
      case 'fair': return 'text-yellow-600'
      case 'poor': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getQualityIcon = (status) => {
    switch (status) {
      case 'excellent':
      case 'good':
        return <CheckCircle className="h-4 w-4" />
      case 'fair':
      case 'poor':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <HelpCircle className="h-4 w-4" />
    }
  }

  const allSystemsReady = defaultQualityChecklist.every(item => 
    item.status === 'excellent' || item.status === 'good'
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Recording</h1>
          <p className="text-gray-600 mt-1">Manage recording sessions with Riverside.fm</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <ExternalLink className="mr-2 h-4 w-4" />
          Launch Riverside Studio
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Launch Studio</h3>
                <p className="text-purple-100 text-sm">Start recording session</p>
              </div>
              <Video className="h-8 w-8 text-purple-200" />
            </div>
            <Button className="w-full mt-4 bg-white text-purple-600 hover:bg-purple-50">
              <Play className="mr-2 h-4 w-4" />
              Start Recording
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Schedule Session</h3>
                <p className="text-green-100 text-sm">Book new recording</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-green-200" />
            </div>
            <Button className="w-full mt-4 bg-white text-green-600 hover:bg-green-50">
              <Plus className="mr-2 h-4 w-4" />
              New Session
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Quality Check</h3>
                <p className="text-blue-100 text-sm">Test setup</p>
              </div>
              <Settings className="h-8 w-8 text-blue-200" />
            </div>
            <Button className="w-full mt-4 bg-white text-blue-600 hover:bg-blue-50">
              <CheckCircle className="mr-2 h-4 w-4" />
              Run Test
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Recording Sessions</CardTitle>
            <CardDescription>Your scheduled content recording sessions</CardDescription>
          </CardHeader>
          <CardContent>
            {sessions.length > 0 ? (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div key={session.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{session.title}</h4>
                        <p className="text-sm text-gray-600">{session.client}</p>
                      </div>
                      <Badge className={getStatusColor(session.status)}>
                        {session.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {session.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {session.time}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {session.duration}
                      </div>
                    </div>
                    
                    {session.participants && session.participants.length > 0 && (
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Users className="h-4 w-4 mr-1" />
                        {session.participants.join(', ')}
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      {session.status === 'ready' && (
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Play className="mr-2 h-4 w-4" />
                          Join
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileVideo className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No Recording Sessions</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Schedule your first recording session to get started.
                </p>
                <Button className="mt-4" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Session
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recording Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Recording Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      {/* Quality Check and Schedule Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recording Quality Checklist */}
        <Card>
          <CardHeader>
            <CardTitle>Recording Quality Checklist</CardTitle>
            <CardDescription>Ensure optimal recording conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {defaultQualityChecklist.map((check, index) => {
                const Icon = check.icon
                return (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-5 w-5 ${getQualityColor(check.status)}`} />
                      <span className="font-medium">{check.item}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getQualityIcon(check.status)}
                      <Badge 
                        variant="outline" 
                        className={`${getQualityColor(check.status)} border-current`}
                      >
                        {check.status}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-2">
                {allSystemsReady ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">All systems ready for recording</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Some systems need attention</span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recording Schedule Options */}
        <Card>
          <CardHeader>
            <CardTitle>Recording Schedule Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <h4 className="font-semibold text-gray-900">Weekly Sessions</h4>
                <p className="text-sm text-gray-600 mt-1">1 hour every week</p>
                <p className="text-xs text-gray-500 mt-2">Recommended for consistent content</p>
              </div>
              
              <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <h4 className="font-semibold text-gray-900">Bi-weekly Sessions</h4>
                <p className="text-sm text-gray-600 mt-1">2 hours twice a month</p>
                <p className="text-xs text-gray-500 mt-2">Balanced approach</p>
              </div>
              
              <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <h4 className="font-semibold text-gray-900">Monthly Sessions</h4>
                <p className="text-sm text-gray-600 mt-1">4 hours once a month</p>
                <p className="text-xs text-gray-500 mt-2">Intensive content creation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex flex-col space-y-2" asChild>
              <a href="https://riverside.fm/help" target="_blank" rel="noopener noreferrer">
                <HelpCircle className="h-5 w-5" />
                <span>Riverside Help Center</span>
              </a>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col space-y-2" asChild>
              <a href="https://riverside.fm/blog/recording-best-practices" target="_blank" rel="noopener noreferrer">
                <Video className="h-5 w-5" />
                <span>Recording Best Practices</span>
              </a>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col space-y-2" asChild>
              <a href="https://riverside.fm/help/troubleshooting" target="_blank" rel="noopener noreferrer">
                <Settings className="h-5 w-5" />
                <span>Setup Troubleshooting</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContentRecording

