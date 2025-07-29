"use client"

import { useState } from 'react'
import { Calendar, Clock, MapPin, Video, Phone, Users, ExternalLink } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'investor':
        return 'bg-purple-100 text-purple-800'
      case 'eir':
        return 'bg-orange-100 text-orange-800'
      case 'customer':
        return 'bg-blue-100 text-blue-800'
      case 'internal':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'video':
        return <Video className="h-4 w-4 text-gray-500" />
      case 'phone':
        return <Phone className="h-4 w-4 text-gray-500" />
      case 'in-person':
        return <MapPin className="h-4 w-4 text-gray-500" />
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          {/* Header */}
          <div className="flex items-center justify-center p-4 border-b">
            <SheetTitle className="text-lg font-semibold">Meeting Details</SheetTitle>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Meeting Title Card */}
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <h1 className="text-lg font-semibold mb-2">{meeting.title}</h1>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getTypeColor(meeting.type)}>
                    {meeting.type}
                  </Badge>
                  <Badge className={getStatusColor(meeting.status)}>
                    {meeting.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">About</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{meeting.time} • {meeting.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getFormatIcon(meeting.format)}
                    <span className="capitalize">{meeting.format}</span>
                    {meeting.location && <span>• {meeting.location}</span>}
                  </div>
                  {meeting.meetingUrl && (
                    <div className="flex items-center space-x-2">
                      <ExternalLink className="h-4 w-4 text-gray-500" />
                      <span className="text-blue-600 underline">Meeting Link</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description Section */}
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Description</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {meeting.description}
                </p>
              </CardContent>
            </Card>

            {/* Attendees Section */}
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Attendees ({meeting.attendees.length}/{meeting.maxAttendees})</h3>
                <div className="space-y-3">
                  {meeting.attendees.map((attendee, index) => {
                    // Check if this attendee has a corresponding connection
                    const attendeeConnection = connections.find((conn: any) => 
                      conn.name === attendee.name && conn.company === attendee.company
                    )
                    
                    return (
                      <div 
                        key={index} 
                        className={`flex items-center space-x-3 p-3 bg-white rounded-lg border ${attendeeConnection ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
                        onClick={attendeeConnection ? () => handleAttendeeClick(attendee.name, attendee.company) : undefined}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={attendee.avatar} alt={attendee.name} />
                          <AvatarFallback>
                            {attendee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{attendee.name}</p>
                          <p className="text-xs text-gray-600 truncate">{attendee.role} at {attendee.company}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Tags Section */}
            {meeting.tags.length > 0 && (
              <Card className="border-0 shadow-none bg-gray-50">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {meeting.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-4">
              <Button className="flex-1">
                <Calendar className="mr-2 h-4 w-4" />
                Join Meeting
              </Button>
              <Button variant="outline">
                <ExternalLink className="h-4 w-4" />
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