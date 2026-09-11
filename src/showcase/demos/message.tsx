import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"
import { PEOPLE } from "@/showcase/fixtures/people"

export function MessagePlayground({
  align,
  showAvatar,
  showHeader,
}: {
  align: "start" | "end"
  showAvatar: boolean
  showHeader: boolean
}) {
  const person = PEOPLE[0]

  return (
    <Message align={align} className="w-full max-w-md">
      {showAvatar ? (
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarImage src={person.avatar} alt={person.name} />
            <AvatarFallback>{person.initials}</AvatarFallback>
          </Avatar>
        </MessageAvatar>
      ) : null}
      <MessageContent>
        {showHeader ? <MessageHeader>{person.name}</MessageHeader> : null}
        Message renders a row with an avatar slot and a content column, aligned
        to whichever side you pass.
        <MessageFooter>2 minutes ago</MessageFooter>
      </MessageContent>
    </Message>
  )
}

export function MessageAlignment() {
  return (
    <MessageGroup className="w-full max-w-md">
      <Message align="start">
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarImage src={PEOPLE[0].avatar} alt={PEOPLE[0].name} />
            <AvatarFallback>{PEOPLE[0].initials}</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>{PEOPLE[0].name}</MessageHeader>
          Did the token rename land?
          <MessageFooter>09:14</MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          Yes — all 61 components picked it up automatically.
          <MessageFooter>09:15</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}

export function MessageThread() {
  const thread = [
    { person: PEOPLE[0], text: "Shipping the showcase today.", time: "10:02" },
    { person: PEOPLE[1], text: "Does it cover every variant?", time: "10:03" },
    {
      person: PEOPLE[0],
      text: "All of them, plus a live playground per component.",
      time: "10:04",
    },
  ]

  return (
    <MessageGroup className="w-full max-w-md">
      {thread.map((entry, index) => (
        <Message key={index}>
          <MessageAvatar>
            <Avatar size="sm">
              <AvatarImage src={entry.person.avatar} alt={entry.person.name} />
              <AvatarFallback>{entry.person.initials}</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <MessageHeader>{entry.person.name}</MessageHeader>
            {entry.text}
            <MessageFooter>{entry.time}</MessageFooter>
          </MessageContent>
        </Message>
      ))}
    </MessageGroup>
  )
}
