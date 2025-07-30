"use client"

import { useState } from 'react'
import { Calendar, Clock, MapPin, Users, Video, ExternalLink, Star, Heart, Share2 } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ConnectionSidePanel } from '@/components/ui/connection-side-panel'
import { Session, Connection } from '@/data/types'
import { connections, getSessionWithAttendees } from '@/data'

interface SessionSidePanelProps {
  session: Session | null
  isOpen: boolean
  onClose: () => void
}

export function SessionSidePanel({ session, isOpen, onClose }: SessionSidePanelProps) {
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null)
  const [isConnectionPanelOpen, setIsConnectionPanelOpen] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  if (!session) return null

  // Get session with attendees based on junction data for consistency
  const sessionWithAttendees = getSessionWithAttendees(session.id) || session

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workshop':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'mentoring':
        return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'networking':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'pitch':
        return 'bg-green-50 text-green-700 border-green-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'ongoing':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'completed':
        return 'bg-gray-50 text-gray-700 border-gray-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'workshop':
        return <Users className="h-4 w-4" />
      case 'mentoring':
        return <Star className="h-4 w-4" />
      case 'networking':
        return <Share2 className="h-4 w-4" />
      case 'pitch':
        return <Video className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  // Find the connection data for the mentor
  const mentorConnection = connections.find(conn => 
    conn.name === session.mentor.name && conn.company === session.mentor.company
  )

  const handleMentorClick = () => {
    if (mentorConnection) {
      setSelectedConnection(mentorConnection)
      setIsConnectionPanelOpen(true)
    }
  }

  const handleCloseConnectionPanel = () => {
    setIsConnectionPanelOpen(false)
    setSelectedConnection(null)
  }

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited)
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:max-w-lg p-0 bg-gray-50/50">
          {/* Header with gradient background */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 pb-8">
            <SheetTitle className="text-xl font-semibold mb-2">Session Details</SheetTitle>
            <div className="flex items-center gap-2">
              <Badge className={`${getTypeColor(sessionWithAttendees.type)} border`}>
                {getTypeIcon(sessionWithAttendees.type)}
                <span className="ml-1 capitalize">{sessionWithAttendees.type}</span>
              </Badge>
              <Badge className={`${getStatusColor(sessionWithAttendees.status)} border`}>
                <span className="capitalize">{sessionWithAttendees.status}</span>
              </Badge>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 left-6 right-6 h-8 bg-white rounded-t-xl"></div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
            {/* Session Title */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl leading-tight mb-2">
                      {sessionWithAttendees.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Learn and grow with expert guidance
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleFavoriteToggle}
                    className="h-8 w-8 p-0 hover:bg-red-50"
                  >
                    <Heart 
                      className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                    />
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Session Info */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  Session Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</p>
                    <p className="text-sm font-medium">{sessionWithAttendees.date}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Time</p>
                    <p className="text-sm font-medium">{sessionWithAttendees.time}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Duration</p>
                    <p className="text-sm font-medium">{sessionWithAttendees.duration}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Location</p>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <p className="text-sm font-medium">TBDC Virtual</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">About This Session</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {sessionWithAttendees.description}
                </p>
              </CardContent>
            </Card>

            {/* Mentor Section */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Session Mentor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className={`group p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 ${mentorConnection ? 'cursor-pointer' : ''}`}
                  onClick={mentorConnection ? handleMentorClick : undefined}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
                        <AvatarImage src={sessionWithAttendees.mentor.avatar} alt={sessionWithAttendees.mentor.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                          {sessionWithAttendees.mentor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm group-hover:text-blue-700 transition-colors">
                          {sessionWithAttendees.mentor.name}
                        </h4>
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          Mentor
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {sessionWithAttendees.mentor.company}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          1 session
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          Available
                        </span>
                      </div>
                    </div>
                    {mentorConnection && (
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Video className="mr-2 h-4 w-4" />
                Join Session
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Connection Side Panel */}
      <ConnectionSidePanel
        connection={selectedConnection}
        isOpen={isConnectionPanelOpen}
        onClose={handleCloseConnectionPanel}
      />
    </>
  )
}