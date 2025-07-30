"use client"

import { useState } from 'react'
import { MapPin, Mail, Calendar, Users, Heart, Star, Clock, Building2, ExternalLink, MessageSquare, Phone, Linkedin, Globe, Share2 } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
  const [isFavorited, setIsFavorited] = useState(false)

  if (!connection) return null

  // Get sessions and meetings that this connection is actually part of
  const associatedSessions = getConnectionSessions(connection.id)
  const associatedMeetings = getConnectionMeetings(connection.id)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'requested':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <Users className="h-3 w-3" />
      case 'pending':
        return <Clock className="h-3 w-3" />
      case 'requested':
        return <MessageSquare className="h-3 w-3" />
      default:
        return <Users className="h-3 w-3" />
    }
  }

  const getSessionStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getSessionTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
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

  const getMeetingStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'declined':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getMeetingTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
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

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited)
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:max-w-lg p-0 bg-gray-50/50">
          {/* Header with gradient background */}
          <div className="relative bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 pb-8">
            <SheetTitle className="text-xl font-semibold mb-2">Connection Profile</SheetTitle>
            <div className="flex items-center gap-2">
              <Badge className={`${getStatusColor(connection.status)} border`}>
                {getStatusIcon(connection.status)}
                <span className="ml-1 capitalize">{connection.status}</span>
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                {connection.industry}
              </Badge>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 left-6 right-6 h-8 bg-white rounded-t-xl"></div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
            {/* Profile Card */}
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
                      <AvatarImage src={connection.avatar} alt={connection.name} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold text-lg">
                        {connection.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 border-3 border-white rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h1 className="text-lg font-bold text-gray-900 mb-1">{connection.name}</h1>
                        <p className="text-sm font-medium text-gray-600">{connection.role}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Building2 className="h-3 w-3 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">{connection.company}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleFavoriteToggle}
                        className="h-8 w-8 p-0 hover:bg-red-50"
                      >
                        <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{connection.mutualConnections} mutual</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{connection.lastContact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Mail className="h-4 w-4 text-indigo-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{connection.email}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{connection.location}</span>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Linkedin className="mr-2 h-3 w-3" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Globe className="mr-2 h-3 w-3" />
                    Website
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bio Section */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {connection.bio}
                </p>
              </CardContent>
            </Card>

            {/* Expertise & Tags */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {connection.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Associated Sessions */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  Sessions ({associatedSessions.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {associatedSessions.length > 0 ? (
                  associatedSessions.map((session) => (
                    <div 
                      key={session.id} 
                      className="group p-3 rounded-lg border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer transition-all duration-200"
                      onClick={() => handleSessionClick(session)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm mb-2 group-hover:text-indigo-700 transition-colors">
                            {session.title}
                          </h4>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Badge className={`${getSessionTypeColor(session.type)} border text-xs`}>
                              {session.type}
                            </Badge>
                            <Badge className={`${getSessionStatusColor(session.status)} border text-xs`}>
                              {session.status}
                            </Badge>
                            <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 text-xs">
                              {session.role}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {session.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {session.time}
                            </span>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-indigo-600 transition-colors" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No associated sessions</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Associated Meetings */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-600" />
                  Meetings ({associatedMeetings.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {associatedMeetings.length > 0 ? (
                  associatedMeetings.map((meeting) => (
                    <div 
                      key={meeting.id} 
                      className="group p-3 rounded-lg border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer transition-all duration-200"
                      onClick={() => handleMeetingClick(meeting)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm mb-2 group-hover:text-indigo-700 transition-colors">
                            {meeting.title}
                          </h4>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Badge className={`${getMeetingTypeColor(meeting.type)} border text-xs`}>
                              {meeting.type}
                            </Badge>
                            <Badge className={`${getMeetingStatusColor(meeting.status)} border text-xs`}>
                              {meeting.status}
                            </Badge>
                            <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 text-xs">
                              {meeting.role}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {meeting.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {meeting.time}
                            </span>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-indigo-600 transition-colors" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No associated meetings</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button className="flex-1 h-11 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11">
                <Share2 className="h-4 w-4" />
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