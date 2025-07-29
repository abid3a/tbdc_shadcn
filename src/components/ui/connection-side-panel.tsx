"use client"

import { useState } from 'react'
import { X, MapPin, Mail, Calendar, Users, Heart, Star, Clock } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SessionSidePanel } from '@/components/ui/session-side-panel'
import { MeetingSidePanel } from '@/components/ui/meeting-side-panel'
import { Connection, Session, Meeting } from '@/data/types'
import { getConnectionSessions, getConnectionMeetings } from '@/data'

interface ConnectionSidePanelProps {
  connection: Connection | null
  isOpen: boolean
  onClose: () => void
}

export function ConnectionSidePanel({ connection, isOpen, onClose }: ConnectionSidePanelProps) {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)
  const [isSessionPanelOpen, setIsSessionPanelOpen] = useState(false)
  const [isMeetingPanelOpen, setIsMeetingPanelOpen] = useState(false)

  if (!connection) return null

  // Get sessions and meetings that this connection is actually part of
  const associatedSessions = getConnectionSessions(connection.id)
  const associatedMeetings = getConnectionMeetings(connection.id)

  // Additional validation to ensure we only show sessions/meetings the connection is part of
  if (!associatedSessions || associatedSessions.length === 0) {
    console.log(`Connection ${connection.name} has no associated sessions`)
  }
  
  if (!associatedMeetings || associatedMeetings.length === 0) {
    console.log(`Connection ${connection.name} has no associated meetings`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'requested':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSessionStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSessionTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'workshop':
        return 'bg-purple-100 text-purple-800'
      case 'mentoring':
        return 'bg-orange-100 text-orange-800'
      case 'networking':
        return 'bg-blue-100 text-blue-800'
      case 'pitch':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getMeetingStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'declined':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getMeetingTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
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

  const handleSessionClick = (session: Session) => {
    setSelectedSession(session)
    setIsSessionPanelOpen(true)
  }

  const handleMeetingClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting)
    setIsMeetingPanelOpen(true)
  }

  const handleCloseSessionPanel = () => {
    setIsSessionPanelOpen(false)
    setSelectedSession(null)
  }

  const handleCloseMeetingPanel = () => {
    setIsMeetingPanelOpen(false)
    setSelectedMeeting(null)
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          {/* Header */}
          <div className="flex items-center justify-center p-4 border-b">
            <SheetTitle className="text-lg font-semibold">Connection Details</SheetTitle>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Connection Profile Card */}
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={connection.avatar} alt={connection.name} />
                    <AvatarFallback>
                      {connection.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h1 className="text-lg font-semibold">{connection.name}</h1>
                      <Badge className={getStatusColor(connection.status)}>
                        {connection.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{connection.role}</p>
                    <p className="text-sm text-gray-600">{connection.company}</p>
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                    <Heart className={`h-5 w-5 ${connection.isFavorite ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
                  </button>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{connection.mutualConnections} mutual</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{connection.lastContact}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{connection.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{connection.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bio Section */}
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">About</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {connection.bio}
                </p>
              </CardContent>
            </Card>

            {/* Industry & Tags */}
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Industry & Expertise</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Industry:</span>
                    <p className="text-sm font-medium">{connection.industry}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Expertise:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {connection.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Associated Sessions */}
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Sessions ({associatedSessions.length})</h3>
                <div className="space-y-3">
                  {associatedSessions.length > 0 ? (
                    associatedSessions.map((session) => (
                      <div 
                        key={session.id} 
                        className="p-3 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleSessionClick(session)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm mb-1">{session.title}</h4>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getSessionTypeColor(session.type)} variant="secondary">
                                {session.type}
                              </Badge>
                              <Badge className={getSessionStatusColor(session.status)} variant="secondary">
                                {session.status}
                              </Badge>
                              <Badge className="bg-blue-100 text-blue-800" variant="secondary">
                                {session.role}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{session.date}</span>
                              <Clock className="h-3 w-3 ml-2" />
                              <span>{session.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No associated sessions</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Associated Meetings */}
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Meetings ({associatedMeetings.length})</h3>
                <div className="space-y-3">
                  {associatedMeetings.length > 0 ? (
                    associatedMeetings.map((meeting) => (
                      <div 
                        key={meeting.id} 
                        className="p-3 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleMeetingClick(meeting)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm mb-1">{meeting.title}</h4>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getMeetingTypeColor(meeting.type)} variant="secondary">
                                {meeting.type}
                              </Badge>
                              <Badge className={getMeetingStatusColor(meeting.status)} variant="secondary">
                                {meeting.status}
                              </Badge>
                              <Badge className="bg-blue-100 text-blue-800" variant="secondary">
                                {meeting.role}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{meeting.date}</span>
                              <Clock className="h-3 w-3 ml-2" />
                              <span>{meeting.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No associated meetings</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-4">
              <Button className="flex-1">
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Session Side Panel */}
      <SessionSidePanel
        session={selectedSession}
        isOpen={isSessionPanelOpen}
        onClose={handleCloseSessionPanel}
      />

      {/* Meeting Side Panel */}
      <MeetingSidePanel
        meeting={selectedMeeting}
        isOpen={isMeetingPanelOpen}
        onClose={handleCloseMeetingPanel}
      />
    </>
  )
}