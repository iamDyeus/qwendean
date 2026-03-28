'use client'

import { useState } from 'react'
import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowUp } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface Option {
  id: string
  label: string
  isCustomInput?: boolean
}

export function ChatSidebar() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! Which category interests you?',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState<Option[]>([
    { id: '1', label: 'Technology' },
    { id: '2', label: 'Business' },
    { id: '3', label: 'Health' },
  ])
  const [showCustomInput, setShowCustomInput] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I received your message: "${input}". This is a simulated response.`,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleOptionSelect = (option: Option) => {
    // Add user message with selected option
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: option.label,
    }

    setMessages((prev) => [...prev, userMessage])
    setOptions([])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `You selected: "${option.label}". Processing your choice...`,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 500)
  }

  const handleShowCustomInput = () => {
    setShowCustomInput(true)
    setOptions([])
  }

  const handleCustomInputSubmit = () => {
    if (!input.trim()) return

    const customText = input

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: customText,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setShowCustomInput(false)
    setOptions([])
    setIsLoading(true)

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `You entered: "${customText}". Processing your input...`,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 500)
  }

  return (
    <Sidebar variant="inset">
      <SidebarContent className="flex flex-col">
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="flex flex-col gap-4 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-3 py-2 text-sm ${message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                      }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground">
                    <span className="inline-block h-2 w-2 rounded-full bg-current animate-bounce"></span>
                    <span className="mx-1 inline-block h-2 w-2 rounded-full bg-current animate-bounce delay-100"></span>
                    <span className="inline-block h-2 w-2 rounded-full bg-current animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </SidebarContent>

      <SidebarFooter className="mr-0 pr-0">
        <div className="flex flex-col gap-2 rounded-lg bg-zinc-900 p-4 border border-zinc-800">
          {options.length > 0 && (
            <>
              <div className="text-xs text-zinc-400 mb-2">Select an option:</div>
              <div className="flex flex-col gap-2 mb-2">
                {options.map((option) => (
                  <Button
                    key={option.id}
                    onClick={() => handleOptionSelect(option)}
                    disabled={isLoading}
                    variant="outline"
                    className="justify-start text-sm h-auto py-2 px-3 border-zinc-700 text-white hover:bg-zinc-800"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
              <div className="text-xs text-zinc-400 mb-2">Or enter custom text:</div>
            </>
          )}
          
          <textarea
            placeholder="Enter your custom answer..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                if (options.length > 0) {
                  handleCustomInputSubmit()
                } else {
                  handleSendMessage()
                }
              }
            }}
            disabled={isLoading}
            className="flex-1 min-h-12 w-full resize-none rounded bg-transparent border-0 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus-visible:ring-0"
          />

          <div className="flex justify-end">
            <Button
              size="icon"
              onClick={
                options.length > 0 ? handleCustomInputSubmit : handleSendMessage
              }
              disabled={isLoading || !input.trim()}
              className="h-8 w-8 shrink-0 bg-zinc-100 text-zinc-900 hover:bg-white disabled:opacity-50"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
