"use client"

import { useState } from 'react'
import { X, Calendar, Clock, MapPin, Heart } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
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

  if (!session) return null

  // Get session with attendees based on junction data for consistency
  const sessionWithAttendees = getSessionWithAttendees(session.id) || session

  const getTypeColor = (type: string) => {
    switch (type) {
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'workshop':
        return '1-to-many'
      case 'mentoring':
        return '1-to-1'
      case 'networking':
        return 'Group'
      case 'pitch':
        return 'Presentation'
      default:
        return type
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

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          {/* Header */}
          <div className="flex items-center justify-center p-4 border-b">
            <SheetTitle className="text-lg font-semibold">Session Details</SheetTitle>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Session Title Card */}
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <h1 className="text-lg font-semibold mb-2">{sessionWithAttendees.title}</h1>
                <Badge className={`${getTypeColor(sessionWithAttendees.type)} text-xs`}>
                  {getTypeLabel(sessionWithAttendees.type)}
                </Badge>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">About</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{sessionWithAttendees.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{sessionWithAttendees.time} • {sessionWithAttendees.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>TBDC</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description Section */}
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Description</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {sessionWithAttendees.description}
                </p>
              </CardContent>
            </Card>

            {/* Mentor Section */}
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Mentor (1)</h3>
                <div 
                  className={`flex items-start space-x-3 p-3 bg-white rounded-lg border ${mentorConnection ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
                  onClick={mentorConnection ? handleMentorClick : undefined}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={sessionWithAttendees.mentor.avatar} alt={sessionWithAttendees.mentor.name} />
                    <AvatarFallback>
                      {sessionWithAttendees.mentor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{sessionWithAttendees.mentor.name}</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">Mentor</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {sessionWithAttendees.mentor.company}
                    </p>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="text-blue-600">1 session</span>
                      <span className="text-blue-600">0 meetings</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                    <Heart className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </CardContent>
            </Card>
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