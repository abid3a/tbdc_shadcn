"use client"

import { useState } from 'react'
import { Calendar, Clock, MapPin, Video, Phone, Users, ExternalLink, Share2, MessageSquare, FileText } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ConnectionSidePanel } from '@/components/ui/connection-side-panel'
import { Meeting, Connection } from '@/data/types'
import { connections, getMeetingConnections } from '@/data'

interface MeetingSidePanelProps {
  meeting: Meeting | null
  isOpen: boolean
  onClose: () => void
}

export function MeetingSidePanel({ meeting, isOpen, onClose }: MeetingSidePanelProps) {
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null)
  const [isConnectionPanelOpen, setIsConnectionPanelOpen] = useState(false)

  if (!meeting) return null

  // Get meeting connections for clickable functionality
  const meetingConnections = getMeetingConnections(meeting.id)

  const handleAttendeeClick = (attendeeName: string, attendeeCompany: string) => {
    // Find the connection data for the attendee
    const attendeeConnection = connections.find(conn => 
      conn.name === attendeeName && conn.company === attendeeCompany
    )
    
    if (attendeeConnection) {
      setSelectedConnection(attendeeConnection)
      setIsConnectionPanelOpen(true)
    }
  }

  const handleCloseConnectionPanel = () => {
    setIsConnectionPanelOpen(false)
    setSelectedConnection(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'completed':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'investor':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'eir':
        return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'customer':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'internal':
        return 'bg-gray-50 text-gray-700 border-gray-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'investor':
        return <FileText className="h-4 w-4" />
      case 'eir':
        return <Users className="h-4 w-4" />
      case 'customer':
        return <MessageSquare className="h-4 w-4" />
      case 'internal':
        return <Calendar className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'video':
        return <Video className="h-4 w-4" />
      case 'phone':
        return <Phone className="h-4 w-4" />
      case 'in-person':
        return <MapPin className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'video':
        return 'text-blue-600'
      case 'phone':
        return 'text-green-600'
      case 'in-person':
        return 'text-purple-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:max-w-lg p-0 bg-gray-50/50">
          {/* Header with gradient background */}
          <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 pb-8">
            <SheetTitle className="text-xl font-semibold mb-2">Meeting Details</SheetTitle>
            <div className="flex items-center gap-2">
              <Badge className={`${getTypeColor(meeting.type)} border`}>
                {getTypeIcon(meeting.type)}
                <span className="ml-1 capitalize">{meeting.type}</span>
              </Badge>
              <Badge className={`${getStatusColor(meeting.status)} border`}>
                <span className="capitalize">{meeting.status}</span>
              </Badge>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 left-6 right-6 h-8 bg-white rounded-t-xl"></div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
            {/* Meeting Title */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl leading-tight mb-2">
                  {meeting.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Connect, collaborate, and make progress together
                </p>
              </CardHeader>
            </Card>

            {/* Meeting Info */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                  Meeting Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</p>
                    <p className="text-sm font-medium">{meeting.date}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Time</p>
                    <p className="text-sm font-medium">{meeting.time}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Duration</p>
                    <p className="text-sm font-medium">{meeting.duration}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Format</p>
                    <div className="flex items-center gap-1">
                      <span className={getFormatColor(meeting.format)}>
                        {getFormatIcon(meeting.format)}
                      </span>
                      <p className="text-sm font-medium capitalize">{meeting.format}</p>
                    </div>
                  </div>
                </div>
                
                {meeting.location && (
                  <div className="pt-2 border-t border-gray-100">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Location</p>
                      <p className="text-sm font-medium">{meeting.location}</p>
                    </div>
                  </div>
                )}

                {meeting.meetingUrl && (
                  <div className="pt-2 border-t border-gray-100">
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Meeting Link</p>
                      <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                        <a href={meeting.meetingUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          Join Meeting
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Meeting Agenda</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {meeting.description}
                </p>
              </CardContent>
            </Card>

            {/* Attendees Section */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4 text-emerald-600" />
                  Attendees ({meeting.attendees.length}/{meeting.maxAttendees})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {meeting.attendees.map((attendee, index) => {
                  // Check if this attendee has a corresponding connection
                  const attendeeConnection = connections.find((conn: any) => 
                    conn.name === attendee.name && conn.company === attendee.company
                  )
                  
                  return (
                    <div 
                      key={index} 
                      className={`group p-3 rounded-lg border-2 border-dashed border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-200 ${attendeeConnection ? 'cursor-pointer' : ''}`}
                      onClick={attendeeConnection ? () => handleAttendeeClick(attendee.name, attendee.company) : undefined}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                            <AvatarImage src={attendee.avatar} alt={attendee.name} />
                            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold text-sm">
                              {attendee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm group-hover:text-emerald-700 transition-colors truncate">
                              {attendee.name}
                            </p>
                            <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                              {attendee.role}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {attendee.company}
                          </p>
                        </div>
                        {attendeeConnection && (
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Tags Section */}
            {meeting.tags.length > 0 && (
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {meeting.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button className="flex-1 h-11 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                <Video className="mr-2 h-4 w-4" />
                Join Meeting
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