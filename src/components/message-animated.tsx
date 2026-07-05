import { type Message as SdkMessage } from "@ai-sdk/react"

import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
import { MessageScrollerItem } from "@/components/ui/message-scroller"

export interface MessageAnimatedProps {
  message: SdkMessage
  scrollAnchor?: boolean
  className?: string
}

export function MessageAnimated({
  message,
  scrollAnchor = false,
  className,
}: MessageAnimatedProps) {
  const isUser = message.role === "user"

  return (
    <MessageScrollerItem scrollAnchor={scrollAnchor} className={className}>
      <Message
        align={isUser ? "end" : "start"}
        className="animate-in fade-in slide-in-from-bottom-2 duration-300"
      >
        {!isUser && (
          <MessageAvatar className="size-8 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center text-xs">
            AI
          </MessageAvatar>
        )}
        <MessageContent>
          <Bubble variant={isUser ? "default" : "secondary"}>
            <BubbleContent className="whitespace-pre-wrap">
              {message.content}
            </BubbleContent>
          </Bubble>
        </MessageContent>
        {isUser && (
          <MessageAvatar className="size-8 rounded-full bg-muted text-muted-foreground font-semibold flex items-center justify-center text-xs">
            U
          </MessageAvatar>
        )}
      </Message>
    </MessageScrollerItem>
  )
}
