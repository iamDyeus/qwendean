import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Check, Edit2, RefreshCw } from 'lucide-react'

interface Section {
  section_name: string
  category: string
  prompt: string
  component_name: string
  file_name: string
}

interface PlanEditorProps {
  plan: { sections: Section[] }
  onApprove: (updatedPlan: { sections: Section[] }) => void
  isGenerating: boolean
  isDone?: boolean
  onRegenerateSection?: (section: Section) => Promise<void>
}

export function PlanEditor({ plan, onApprove, isGenerating, isDone, onRegenerateSection }: PlanEditorProps) {
  const [sections, setSections] = useState<Section[]>(plan.sections)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(null)

  const handlePromptChange = (index: number, newPrompt: string) => {
    const updated = [...sections]
    updated[index].prompt = newPrompt
    setSections(updated)
  }

  const handleRegenerate = async (index: number) => {
    if (!onRegenerateSection) return
    setRegeneratingIndex(index)
    setEditingIndex(null)
    try {
      await onRegenerateSection(sections[index])
    } finally {
      setRegeneratingIndex(null)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Landing Page Plan</span>
          {!isDone && (
            <Button onClick={() => onApprove({ sections })} disabled={isGenerating} className="gap-2">
              <Check className="h-4 w-4" />
              {isGenerating ? 'Generating...' : 'Approve & Generate'}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {sections.map((section, index) => (
            <AccordionItem key={index} value={`section-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{section.section_name}</span>
                  <span className="text-xs text-muted-foreground">({section.category})</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`prompt-${index}`}>Generation Prompt</Label>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      {isDone && onRegenerateSection && (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={regeneratingIndex !== null}
                          onClick={() => handleRegenerate(index)}
                        >
                          <RefreshCw className={`h-3 w-3 ${regeneratingIndex === index ? 'animate-spin' : ''}`} />
                        </Button>
                      )}
                    </div>
                  </div>
                  {editingIndex === index ? (
                    <Textarea
                      id={`prompt-${index}`}
                      value={section.prompt}
                      onChange={(e) => handlePromptChange(index, e.target.value)}
                      rows={6}
                      className="font-mono text-xs"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                      {section.prompt}
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div><span className="font-medium">Component:</span> {section.component_name}</div>
                    <div><span className="font-medium">File:</span> {section.file_name}</div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
