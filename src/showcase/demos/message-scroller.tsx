import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { PEOPLE } from "@/showcase/fixtures/people"

const SEED = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  person: PEOPLE[index % PEOPLE.length],
  text: `Message ${index + 1} — the viewport keeps its own scroll state and fades content at the bottom edge.`,
}))

function Thread({ extra }: { extra: number }) {
  const messages = [
    ...SEED,
    ...Array.from({ length: extra }, (_, index) => ({
      id: SEED.length + index,
      person: PEOPLE[(SEED.length + index) % PEOPLE.length],
      text: `Appended message ${index + 1}.`,
    })),
  ]

  return (
    <MessageScrollerContent className="gap-4 p-4">
      {messages.map((message, index) => (
        <MessageScrollerItem
          key={message.id}
          scrollAnchor={index === messages.length - 1}
        >
          <Message>
            <MessageAvatar>
              <Avatar size="sm">
                <AvatarImage
                  src={message.person.avatar}
                  alt={message.person.name}
                />
                <AvatarFallback>{message.person.initials}</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <MessageHeader>{message.person.name}</MessageHeader>
              {message.text}
            </MessageContent>
          </Message>
        </MessageScrollerItem>
      ))}
    </MessageScrollerContent>
  )
}

export function MessageScrollerPlayground({
  autoScroll,
  defaultScrollPosition,
}: {
  autoScroll: boolean
  defaultScrollPosition: "start" | "end"
}) {
  const [extra, setExtra] = React.useState(0)

  return (
    <div className="flex w-full flex-col gap-3">
      {/* Keyed on the provider props so changing them re-initialises cleanly. */}
      <MessageScrollerProvider
        key={`${autoScroll}-${defaultScrollPosition}`}
        autoScroll={autoScroll}
        defaultScrollPosition={defaultScrollPosition}
      >
        {/* The scroller fills its parent, so the parent must be bounded. */}
        <MessageScroller className="h-96 rounded-xl border">
          <MessageScrollerViewport>
            <Thread extra={extra} />
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
      <Button
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => setExtra((current) => current + 1)}
      >
        Append a message
      </Button>
    </div>
  )
}

export function MessageScrollerBasic() {
  return (
    <MessageScrollerProvider autoScroll defaultScrollPosition="end">
      <MessageScroller className="h-96 w-full rounded-xl border">
        <MessageScrollerViewport>
          <Thread extra={0} />
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  )
}

export function MessageScrollerWithBubbles() {
  return (
    <MessageScrollerProvider autoScroll defaultScrollPosition="end">
      <MessageScroller className="h-80 w-full rounded-xl border">
        <MessageScrollerViewport>
          <MessageScrollerContent className="gap-3 p-4">
            {SEED.slice(0, 12).map((message, index) => (
              <MessageScrollerItem key={message.id} scrollAnchor={index === 11}>
                <Bubble
                  align={index % 2 === 0 ? "start" : "end"}
                  variant={index % 2 === 0 ? "muted" : "default"}
                >
                  <BubbleContent>{message.text}</BubbleContent>
                </Bubble>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  )
}
