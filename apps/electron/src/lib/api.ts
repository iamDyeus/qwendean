const API_BASE_URL = 'http://localhost:8000/api';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Option {
  id: string;
  label: string;
}

export interface SessionResponse {
  session_id: string;
  messages: Message[];
  options: Option[];
  waiting_for_input: boolean;
  interrupt_prompt: string | null;
  section_plan: any | null;
  preview_components: any[];
  final_page_path: string | null;
  error: string | null;
}

export const landingPageApi = {
  async resetSession(sessionId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId }),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
  },

  async startSession(userRequest: string, sessionId: string, projectId: string): Promise<SessionResponse> {
    const response = await fetch(`${API_BASE_URL}/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        user_request: userRequest, 
        session_id: sessionId,
        project_id: projectId 
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    return response.json();
  },

  async resumeSession(sessionId: string, userInput: string): Promise<SessionResponse> {
    const response = await fetch(`${API_BASE_URL}/resume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, user_input: userInput }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    return response.json();
  },

  async updatePlan(sessionId: string, sectionPlan: any): Promise<SessionResponse> {
    const response = await fetch(`${API_BASE_URL}/update-plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, section_plan: sectionPlan }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    return response.json();
  },

  async ignoreErrors(projectId: string, fileName: string, errorMessage?: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/ignore-errors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project_id: projectId, file_name: fileName, error_message: errorMessage ?? '' }),
    });
    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
  },

  async regenerateSection(projectId: string, sessionId: string, section: any): Promise<{ file_name: string; component_name: string; code: string }> {
    const response = await fetch(`${API_BASE_URL}/regenerate-section`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, project_id: projectId, section }),
    });
    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    return response.json();
  },

  async generateFromPlan(projectId: string, plan: any): Promise<{ preview_components: any[]; final_page_path: string }> {
    const response = await fetch(`${API_BASE_URL}/generate-from-plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project_id: projectId, plan }),
    });
    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    return response.json();
  },

  async approvePlan(sessionId: string): Promise<SessionResponse> {
    const response = await fetch(`${API_BASE_URL}/approve-plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, user_input: 'approve' }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    return response.json();
  },
};
