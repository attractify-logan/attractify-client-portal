import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Calendar,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  Video,
  Settings,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Plus,
  FileText
} from 'lucide-react'

const Timeline = ({ clients = [], selectedClientId = null, onClientSelect = () => {} }) => {
  const [expandedMonth, setExpandedMonth] = useState(1)
  const [currentClientId, setCurrentClientId] = useState(selectedClientId)

  // Default 3-month timeline template
  const defaultTimelineTemplate = [
    {
      month: 1,
      title: 'Setup & Orientation',
      description: 'Initial setup and client onboarding',
      weeks: [
        {
          week: 1,
          title: 'Account Creation & Orientation',
          tasks: [
            { task: 'Schedule onboarding call', assignee: 'Team' },
            { task: 'Website access setup', assignee: 'Client' },
            { task: 'Initial consultation', assignee: 'Team' }
          ]
        },
        {
          week: 2,
          title: 'Tool Access & Training',
          tasks: [
            { task: 'Social media integration', assignee: 'Team' },
            { task: 'Recording schedule setup', assignee: 'Client' },
            { task: 'Platform training session', assignee: 'Team' }
          ]
        },
        {
          week: 3,
          title: 'Analytics Implementation',
          tasks: [
            { task: 'Google Analytics 4 setup', assignee: 'Team' },
            { task: 'Google Tag Manager configuration', assignee: 'Team' },
            { task: 'Tracking verification', assignee: 'Team' }
          ]
        },
        {
          week: 4,
          title: 'First Content Recording',
          tasks: [
            { task: 'Recording session preparation', assignee: 'Client' },
            { task: 'First content recording', assignee: 'Both' },
            { task: 'Content review and feedback', assignee: 'Team' }
          ]
        }
      ]
    },
    {
      month: 2,
      title: 'Content & Monitoring',
      description: 'Content creation and performance monitoring',
      weeks: [
        {
          week: 1,
          title: 'Content Production',
          tasks: [
            { task: 'Weekly recording sessions', assignee: 'Both' },
            { task: 'Content editing and optimization', assignee: 'Team' },
            { task: 'Publishing and distribution', assignee: 'Team' }
          ]
        },
        {
          week: 2,
          title: 'Performance Monitoring',
          tasks: [
            { task: 'Analytics review and reporting', assignee: 'Team' },
            { task: 'Content performance analysis', assignee: 'Team' },
            { task: 'Strategy adjustments', assignee: 'Both' }
          ]
        },
        {
          week: 3,
          title: 'Optimization',
          tasks: [
            { task: 'SEO optimization', assignee: 'Team' },
            { task: 'Social media engagement', assignee: 'Team' },
            { task: 'Audience feedback collection', assignee: 'Both' }
          ]
        },
        {
          week: 4,
          title: 'Monthly Review',
          tasks: [
            { task: 'Performance report generation', assignee: 'Team' },
            { task: 'Client review meeting', assignee: 'Both' },
            { task: 'Next month planning', assignee: 'Both' }
          ]
        }
      ]
    },
    {
      month: 3,
      title: 'Analysis & Optimization',
      description: 'Traffic analysis and strategy optimization',
      weeks: [
        {
          week: 1,
          title: 'Deep Analytics Review',
          tasks: [
            { task: 'Traffic analysis and insights', assignee: 'Team' },
            { task: 'Conversion tracking review', assignee: 'Team' },
            { task: 'ROI calculation and reporting', assignee: 'Team' }
          ]
        },
        {
          week: 2,
          title: 'Strategy Optimization',
          tasks: [
            { task: 'Content strategy refinement', assignee: 'Both' },
            { task: 'Target audience analysis', assignee: 'Team' },
            { task: 'Campaign optimization', assignee: 'Team' }
          ]
        },
        {
          week: 3,
          title: 'Implementation',
          tasks: [
            { task: 'New strategy implementation', assignee: 'Team' },
            { task: 'A/B testing setup', assignee: 'Team' },
            { task: 'Performance monitoring', assignee: 'Team' }
          ]
        },
        {
          week: 4,
          title: 'Results & Planning',
          tasks: [
            { task: 'Final results analysis', assignee: 'Team' },
            { task: 'Success metrics review', assignee: 'Both' },
            { task: 'Future planning session', assignee: 'Both' }
          ]
        }
      ]
    }
  ]

  const currentClient = clients.find(client => client.id === currentClientId)
  const timelineData = currentClient?.timeline || defaultTimelineTemplate.map(month => ({
    ...month,
    status: 'pending',
    progress: 0,
    weeks: month.weeks.map(week => ({
      ...week,
      tasks: week.tasks.map(task => ({
        ...task,
        status: 'pending'
      }))
    }))
  }))

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'in-progress': return <Clock className="h-5 w-5 text-blue-600" />
      default: return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const calculateOverallProgress = () => {
    if (!timelineData.length) return 0
    const totalProgress = timelineData.reduce((acc, month) => acc + (month.progress || 0), 0)
    return Math.round(totalProgress / timelineData.length)
  }

  const handleClientChange = (clientId) => {
    setCurrentClientId(clientId)
    onClientSelect(clientId)
  }

  if (clients.length === 0) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Onboarding Timeline</h1>
            <p className="text-gray-600 mt-1">Track progress through the 3-month onboarding journey</p>
          </div>
        </div>

        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Clients Yet</h3>
            <p className="text-gray-600 mb-6">
              Add your first client to start tracking their onboarding timeline.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add First Client
            </Button>
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
          <h1 className="text-3xl font-bold text-gray-900">Onboarding Timeline</h1>
          <p className="text-gray-600 mt-1">Track progress through the 3-month onboarding journey</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {currentClient ? `Month ${getCurrentMonth(currentClient)}` : 'Select Client'}
          </div>
          <div className="text-sm text-gray-600">Current Phase</div>
        </div>
      </div>

      {/* Client Selection */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Client Timeline</CardTitle>
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

      {/* Overall Progress */}
      {currentClient && (
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardHeader>
            <CardTitle className="text-white">Overall Timeline Progress</CardTitle>
            <CardDescription className="text-blue-100">
              3-month onboarding journey completion status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Progress</span>
                <span className="text-2xl font-bold">{calculateOverallProgress()}%</span>
              </div>
              <Progress value={calculateOverallProgress()} className="h-3 bg-blue-800" />
              <div className="grid grid-cols-3 gap-4 text-center">
                {timelineData.map((month) => (
                  <div key={month.month}>
                    <div className="text-lg font-bold">{month.progress || 0}%</div>
                    <div className="text-xs text-blue-100">Month {month.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline */}
      {currentClient ? (
        <div className="space-y-6">
          {timelineData.map((month) => (
            <Card key={month.month} className={`transition-all ${
              month.status === 'in-progress' ? 'ring-2 ring-blue-500' : ''
            }`}>
              <CardHeader 
                className="cursor-pointer"
                onClick={() => setExpandedMonth(expandedMonth === month.month ? null : month.month)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(month.status)}
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>Month {month.month}: {month.title}</span>
                        {expandedMonth === month.month ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                        }
                      </CardTitle>
                      <CardDescription>{month.description}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(month.status)}>
                      {month.status || 'pending'}
                    </Badge>
                    <div className="text-sm font-bold text-gray-900 mt-1">
                      {month.progress || 0}% Complete
                    </div>
                  </div>
                </div>
                <Progress value={month.progress || 0} className="mt-4" />
              </CardHeader>

              {expandedMonth === month.month && (
                <CardContent>
                  <div className="space-y-6">
                    {month.weeks.map((week) => (
                      <div key={week.week} className="border-l-2 border-blue-200 pl-6 relative">
                        <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Week {week.week}: {week.title}
                        </h4>
                        <div className="space-y-2">
                          {week.tasks.map((task, taskIndex) => (
                            <div key={taskIndex} className="flex items-center justify-between p-2 rounded bg-gray-50">
                              <div className="flex items-center space-x-3">
                                {getStatusIcon(task.status)}
                                <span className="text-sm">{task.task}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-600">Assigned to: {task.assignee}</span>
                                <Badge variant="outline" className={getStatusColor(task.status)}>
                                  {task.status || 'pending'}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Client</h3>
            <p className="text-gray-600">
              Choose a client from the dropdown above to view their onboarding timeline.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Milestones */}
      {currentClient && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900">Upcoming Milestones</CardTitle>
            <CardDescription className="text-yellow-700">
              Key deliverables and deadlines ahead
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getUpcomingMilestones(currentClient).map((milestone, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-yellow-200">
                  <div>
                    <h4 className="font-semibold text-yellow-900">{milestone.title}</h4>
                    <p className="text-sm text-yellow-700">{milestone.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-yellow-900">{milestone.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Helper functions
const getCurrentMonth = (client) => {
  // Logic to determine current month based on client progress
  return client.currentMonth || 1
}

const getUpcomingMilestones = (client) => {
  // Logic to get upcoming milestones for the client
  return client.upcomingMilestones || [
    {
      title: 'Monthly Review Meeting',
      description: 'Progress review and planning session',
      date: 'Next Week'
    }
  ]
}

export default Timeline

