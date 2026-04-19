import { useState, useEffect, useRef, MutableRefObject } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUp, Square } from "lucide-react";
import { landingPageApi, type Message, type Option } from "@/lib/api";
import { PlanEditor } from "./plan-editor";
import type { GenerationStatus } from "@/routes/app.$appId";

interface ChatSidebarProps {
  projectId: string;
  projectName: string;
  onStatusChange: (status: GenerationStatus) => void;
  resetRef: MutableRefObject<() => void>;
}

export function ChatSidebar({ projectId, projectName, onStatusChange, resetRef }: ChatSidebarProps) {
  const sessionId = projectId;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState<Option[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [sectionPlan, setSectionPlan] = useState<any>(null);
  const [showPlanEditor, setShowPlanEditor] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const isDone = messages.at(-1)?.content?.includes("components successfully") ?? false;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showPlanEditor, isLoading, isGenerating]);

  useEffect(() => {
    resetRef.current = () => {
      setMessages([]);
      setInput("");
      setOptions([]);
      setHasStarted(false);
      setSectionPlan(null);
      setShowPlanEditor(false);
      setIsGenerating(false);
    };
  }, [resetRef]);

  useEffect(() => {
    loadConversationHistory();
  }, [projectId]);

  const loadConversationHistory = async () => {
    try {
      const project = await window.database.getProject(projectId);
      if (project?.conversation) {
        const messages = JSON.parse(project.conversation);
        if (messages.length > 0) {
          setMessages(messages);
          setHasStarted(true);
          // Restore preview status from history
          const lastMsg = messages[messages.length - 1];
          if (lastMsg?.role === "assistant" && lastMsg.content.includes("Generated") && lastMsg.content.includes("components successfully")) {
            onStatusChange("done");
          }
        }
      }
    } catch (error) {
      console.error("Failed to load history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveConversation = async (messages: Message[]) => {
    try {
      await window.database.updateConversation(
        projectId,
        JSON.stringify(messages),
      );
    } catch (error) {
      console.error("Failed to save conversation:", error);
    }
  };

  const handleStartSession = async () => {
    if (!input.trim()) return;

    const userRequest = input;
    setInput("");

    const userMessage: Message = { role: "user", content: userRequest };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    onStatusChange("understanding");

    try {
      const response = await landingPageApi.startSession(
        userRequest,
        sessionId,
        projectId,
      );
      setMessages(response.messages);
      setOptions(response.options);
      setHasStarted(true);

      await saveConversation(response.messages);

      if (response.section_plan) {
        setSectionPlan(response.section_plan);
        onStatusChange("waiting_approval");
        if (!response.options || response.options.length === 0) {
          setShowPlanEditor(true);
        }
      }
    } catch (error) {
      console.error("Failed to start session:", error);
      onStatusChange("idle");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, there was an error connecting to the server. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setOptions([]);
    setIsLoading(true);
    onStatusChange("understanding");

    try {
      const response = await landingPageApi.resumeSession(sessionId, message);
      setMessages(response.messages);
      setOptions(response.options);

      await saveConversation(response.messages);

      if (response.section_plan) {
        setSectionPlan(response.section_plan);
        onStatusChange("waiting_approval");
        if (!response.options || response.options.length === 0) {
          setShowPlanEditor(true);
        }
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      onStatusChange("idle");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, there was an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprovePlan = async (updatedPlan: any) => {
    setIsGenerating(true);
    setShowPlanEditor(false);
    onStatusChange("generating");

    try {
      // Update plan if edited
      if (JSON.stringify(updatedPlan) !== JSON.stringify(sectionPlan)) {
        await landingPageApi.updatePlan(sessionId, updatedPlan);
        setSectionPlan(updatedPlan);
      }

      // Approve and generate
      const response = await landingPageApi.approvePlan(sessionId);

      if (
        response.preview_components &&
        response.preview_components.length > 0
      ) {
        const successMessage = {
          role: "assistant" as const,
          content: `✅ Generated ${response.preview_components.length} components successfully!`,
        };
        const updatedMessages = [...messages, successMessage];
        setMessages(updatedMessages);
        await saveConversation(updatedMessages);
        onStatusChange("done");
      }
    } catch (error) {
      console.error("Failed to approve plan:", error);
      onStatusChange("waiting_approval");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, there was an error generating code. Please try again.",
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isLoading || isGenerating) return;

      if (!hasStarted) {
        handleStartSession();
      } else if (input.trim()) {
        handleSendMessage(input);
        setInput("");
      }
    }
  };

  const handleOptionSelect = (option: Option) => {
    if (isLoading || isGenerating) return;
    handleSendMessage(option.label);
  };

  const handleCustomInputSubmit = () => {
    if (!input.trim() || isLoading || isGenerating) return;
    handleSendMessage(input);
    setInput("");
  };

  return (
    <Sidebar variant="inset" className="mt-21">
      <SidebarContent className="flex flex-col">
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="flex flex-col gap-4 p-4">
              {!hasStarted && messages.length === 0 && !isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-xs rounded-lg px-3 py-2 text-sm bg-secondary text-secondary-foreground">
                  👋 Hi! What would you like to build for <strong>{projectName}</strong>? Describe your landing page idea and I'll get started.
                  </div>
                </div>
              )}
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-3 py-2 text-sm ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {message.content || "Check out the plan made for you 👇"}
                  </div>
                </div>
              ))}

              {showPlanEditor && sectionPlan && (
                <div className="w-full">
                  <PlanEditor
                    plan={sectionPlan}
                    onApprove={handleApprovePlan}
                    isGenerating={isGenerating}
                  />
                </div>
              )}

              {(isLoading || isGenerating) && (
                <div className="flex justify-start">
                  <div className="rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground">
                    <span className="inline-block h-2 w-2 rounded-full bg-current animate-bounce"></span>
                    <span className="mx-1 inline-block h-2 w-2 rounded-full bg-current animate-bounce delay-100"></span>
                    <span className="inline-block h-2 w-2 rounded-full bg-current animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>
        </div>
      </SidebarContent>

      {!isDone && (
      <SidebarFooter className="mr-0 pr-0 mb-19">
        <div className="flex flex-col gap-2 rounded-lg bg-zinc-900 p-4 border border-zinc-800">
          {options.length > 0 && !showPlanEditor && (
            <>
              <div className="text-xs text-zinc-400 mb-2">
                Select an option:
              </div>
              <div className="flex flex-col gap-2 mb-2">
                {options.map((option) => (
                  <Button
                    key={option.id}
                    onClick={() => handleOptionSelect(option)}
                    disabled={isLoading || isGenerating}
                    variant="outline"
                    className="justify-start text-sm h-auto py-2 px-3 border-zinc-700 text-white hover:bg-zinc-800"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
              <div className="text-xs text-zinc-400 mb-2">
                Or enter custom text:
              </div>
            </>
          )}

          {!showPlanEditor && (
            <>
              <textarea
                placeholder={
                  !hasStarted
                    ? "Describe your landing page idea..."
                    : "Enter your custom answer..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading || isGenerating}
                className="flex-1 min-h-12 w-full resize-none rounded bg-transparent border-0 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus-visible:ring-0"
              />

              <div className="flex justify-end">
                <Button
                  size="icon"
                  onClick={
                    !hasStarted
                      ? handleStartSession
                      : options.length > 0
                        ? handleCustomInputSubmit
                        : () => {
                            handleSendMessage(input);
                            setInput("");
                          }
                  }
                  disabled={isLoading || isGenerating ? false : !input.trim()}
                  className="h-8 w-8 shrink-0 bg-zinc-100 text-zinc-900 hover:bg-white disabled:opacity-50"
                >
                  {isLoading || isGenerating ? (
                    <Square className="h-4 w-4" />
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SidebarFooter>
      )}
    </Sidebar>
  );
}
