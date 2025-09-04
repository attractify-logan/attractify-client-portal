import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  HelpCircle,
  Mail,
  Calendar,
  ExternalLink,
  MessageCircle,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Book,
  Video,
  FileText
} from 'lucide-react'

const Support = () => {
  const supportChannels = [
    {
      title: 'Email Support',
      description: 'Get help via email for technical questions and general inquiries',
      icon: Mail,
      contact: 'admin@attractifymarketing.com',
      responseTime: '24 hours',
      availability: '24/7',
      type: 'primary'
    },
    {
      title: 'Schedule Changes',
      description: 'Request changes to recording schedules or meeting times',
      icon: Calendar,
      contact: 'admin@attractifymarketing.com',
      responseTime: '4 hours',
      availability: 'Business hours',
      type: 'secondary'
    },
    {
      title: 'Live Chat',
      description: 'Instant support for urgent issues and quick questions',
      icon: MessageCircle,
      contact: 'Available in portal',
      responseTime: '5 minutes',
      availability: '9 AM - 6 PM EST',
      type: 'primary'
    }
  ]

  const commonIssues = [
    {
      title: 'Website Access Issues',
      description: 'Problems logging into client websites or obtaining admin access',
      solution: 'Contact the client to verify admin credentials and ensure admin@attractifymarketing.com is added as an administrator.',
      category: 'Access'
    },
    {
      title: 'Google Analytics Setup',
      description: 'Difficulties configuring GA4 or tracking codes not working',
      solution: 'Verify tracking code placement in website header and check for conflicts with existing analytics.',
      category: 'Analytics'
    },
    {
      title: 'Recording Quality Issues',
      description: 'Audio/video quality problems during Riverside sessions',
      solution: 'Run quality check before recording, ensure stable internet connection, and verify microphone/camera settings.',
      category: 'Recording'
    },
    {
      title: 'Social Media Integration',
      description: 'Problems connecting social media accounts via Admatic.io',
      solution: 'Ensure client has admin access to social accounts and verify API permissions are granted.',
      category: 'Integration'
    }
  ]

  const resources = [
    {
      title: 'Onboarding Guide',
      description: 'Complete step-by-step onboarding process',
      icon: Book,
      link: '#',
      type: 'guide'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch how-to videos for common tasks',
      icon: Video,
      link: '#',
      type: 'video'
    },
    {
      title: 'Analytics Setup',
      description: 'Detailed GA4 and GTM configuration guide',
      icon: FileText,
      link: '/analytics',
      type: 'internal'
    },
    {
      title: 'Recording Best Practices',
      description: 'Tips for high-quality content recording',
      icon: Video,
      link: 'https://riverside.fm/blog/recording-best-practices',
      type: 'external'
    }
  ]

  const getChannelIcon = (type) => {
    return type === 'primary' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Access': 'bg-red-100 text-red-800',
      'Analytics': 'bg-blue-100 text-blue-800',
      'Recording': 'bg-purple-100 text-purple-800',
      'Integration': 'bg-green-100 text-green-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Attractify Support Center</h1>
        <p className="text-gray-600 mt-1">Get help with client onboarding, AI marketing strategies, and technical support</p>
      </div>

      {/* Contact Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportChannels.map((channel, index) => {
          const Icon = channel.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${getChannelIcon(channel.type)}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{channel.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{channel.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-700">
                        <Mail className="h-4 w-4 mr-2" />
                        {channel.contact}
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-4 w-4 mr-2" />
                        Response: {channel.responseTime}
                      </div>
                      <div className="flex items-center text-gray-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {channel.availability}
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-4" 
                      variant={channel.type === 'primary' ? 'default' : 'outline'}
                      asChild
                    >
                      <a href={`mailto:${channel.contact}`}>
                        Contact Support
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Common Issues */}
      <Card>
        <CardHeader>
          <CardTitle>Common Issues & Solutions</CardTitle>
          <CardDescription>Quick solutions to frequently encountered problems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {commonIssues.map((issue, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{issue.title}</h4>
                  <Badge className={getCategoryColor(issue.category)}>
                    {issue.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{issue.description}</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800">{issue.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Resources & Documentation</CardTitle>
          <CardDescription>Helpful guides and tutorials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{resource.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                      <Button size="sm" variant="outline" asChild>
                        {resource.type === 'external' ? (
                          <a href={resource.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Resource
                          </a>
                        ) : (
                          <a href={resource.link}>
                            View Guide
                          </a>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            Emergency Support
          </CardTitle>
          <CardDescription className="text-red-700">
            For urgent issues that require immediate attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-900 font-medium">Critical system failures or client emergencies</p>
              <p className="text-red-700 text-sm">Available 24/7 for urgent matters</p>
            </div>
            <Button className="bg-red-600 hover:bg-red-700" asChild>
              <a href="mailto:admin@attractifymarketing.com?subject=URGENT%20-%20Emergency%20Support%20Needed">
                <Mail className="mr-2 h-4 w-4" />
                Emergency Contact
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-gray-50">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Need Additional Help?</h3>
          <p className="text-gray-600 mb-4">
            Our support team is here to help you succeed with your client onboarding process.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" asChild>
              <a href="mailto:admin@attractifymarketing.com">
                <Mail className="mr-2 h-4 w-4" />
                Email Support
              </a>
            </Button>
            <Button asChild>
              <a href="https://calendly.com/admin-attractifymarketing/support-call" target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Call
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Support

