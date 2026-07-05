import { type ChatTransport, type UIMessage, type UIMessageChunk } from "ai"
import { type Message } from "@ai-sdk/react"

interface ChatStep {
  type: "message" | "sleep"
  role?: "user" | "assistant"
  content?: string;
  duration?: number
}

class ChatBuilder {
  private steps: ChatStep[] = []

  user(content: string) {
    this.steps.push({ type: "message", role: "user", content })
    return this
  }

  assistant(content: string) {
    this.steps.push({ type: "message", role: "assistant", content })
    return this
  }

  sleep(durationMs: number) {
    this.steps.push({ type: "sleep", duration: durationMs })
    return this
  }

  get({ count }: { count: number }): Message[] {
    const messages: Message[] = []
    let msgCount = 0
    for (const step of this.steps) {
      if (step.type === "message" && msgCount < count) {
        messages.push({
          id: `msg-${messages.length}`,
          role: step.role as "user" | "assistant",
          content: step.content || "",
          createdAt: new Date(),
        })
        msgCount++
      }
    }
    return messages
  }

  next({ after }: { after: Message[] }): Message | undefined {
    if (after.length > 0) {
      const lastMessage = after[after.length - 1]
      if (lastMessage.role === "user") {
        return undefined
      }
    }

    const userMessagesInAfter = after.filter((m) => m.role === "user").length
    const userSteps = this.steps.filter(
      (step) => step.type === "message" && step.role === "user"
    )

    if (userMessagesInAfter < userSteps.length) {
      const nextStep = userSteps[userMessagesInAfter]
      return {
        id: `msg-user-next-${userMessagesInAfter}`,
        role: "user" as const,
        content: nextStep.content || "",
        createdAt: new Date(),
      }
    }
    return undefined
  }

  transport({ chunkDelayMs = 20 }: { chunkDelayMs?: number } = {}): ChatTransport<UIMessage> {
    const steps = this.steps
    return {
      sendMessages: async (options) => {
        const userMessagesCount = options.messages.filter((m) => m.role === "user").length
        const userSteps = steps.filter(
          (step) => step.type === "message" && step.role === "user"
        )

        if (userMessagesCount === 0 || userMessagesCount > userSteps.length) {
          return new ReadableStream<UIMessageChunk>({
            start(controller) {
              controller.close()
            },
          })
        }

        const userStepIndex = steps.indexOf(userSteps[userMessagesCount - 1])

        let sleepDuration = 0
        let assistantContent = ""
        for (let i = userStepIndex + 1; i < steps.length; i++) {
          const step = steps[i]
          if (step.type === "sleep") {
            sleepDuration += step.duration || 0
          } else if (step.type === "message" && step.role === "assistant") {
            assistantContent = step.content || ""
            break
          }
        }

        const tokens: string[] = []
        let currentToken = ""
        for (let i = 0; i < assistantContent.length; i++) {
          const char = assistantContent[i]
          currentToken += char
          if (char === " " || char === "\n" || currentToken.length >= 4) {
            tokens.push(currentToken)
            currentToken = ""
          }
        }
        if (currentToken) {
          tokens.push(currentToken)
        }

        const assistantMessageId = `msg-assistant-${userMessagesCount}`

        return new ReadableStream<UIMessageChunk>({
          async start(controller) {
            try {
              if (sleepDuration > 0) {
                await new Promise<void>((resolve, reject) => {
                  const timer = setTimeout(resolve, sleepDuration)
                  if (options.abortSignal) {
                    options.abortSignal.addEventListener("abort", () => {
                      clearTimeout(timer)
                      reject(new Error("Aborted"))
                    })
                  }
                })
              }

              if (options.abortSignal?.aborted) {
                controller.close()
                return
              }

              controller.enqueue({ type: "start", messageId: assistantMessageId })
              controller.enqueue({ type: "text-start", id: assistantMessageId })

              for (const token of tokens) {
                if (options.abortSignal?.aborted) {
                  break
                }
                controller.enqueue({
                  type: "text-delta",
                  id: assistantMessageId,
                  delta: token,
                })
                await new Promise((resolve) => setTimeout(resolve, chunkDelayMs))
              }

              if (!options.abortSignal?.aborted) {
                controller.enqueue({ type: "text-end", id: assistantMessageId })
                controller.enqueue({ type: "finish", finishReason: "stop" })
              }
            } catch (err: any) {
              if (err instanceof Error && err.message === "Aborted") {
                // Ignore abort error
              } else {
                controller.enqueue({ type: "error", errorText: String(err) })
              }
            } finally {
              controller.close()
            }
          },
        })
      },
      reconnectToStream: async () => {
        return null
      },
    }
  }
}

export function createChat() {
  return new ChatBuilder()
}

export function getMessageText(
  message: Message | { content: string } | string
): string {
  if (typeof message === "string") {
    return message
  }
  if (message && typeof message === "object" && "content" in message) {
    return message.content
  }
  return ""
}
