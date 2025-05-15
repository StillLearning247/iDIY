import { allProjects } from '@/data/projects';

interface N8NWebhookPayload {
  projectId: string;
  type: 'description' | 'safety' | 'steps';
  content: string;
}

export async function POST(request: Request) {
  try {
    const payload: N8NWebhookPayload = await request.json();
    const { projectId, type, content } = payload;

    // Validate webhook payload
    if (!projectId || !type || !content) {
      return new Response('Invalid webhook payload', { status: 400 });
    }

    // Find project
    const project = allProjects.find(p => p.id === projectId);
    if (!project) {
      return new Response('Project not found', { status: 404 });
    }

    // In a real app, you would update the project in your database
    // For now, we'll just return the generated content
    return Response.json({
      success: true,
      projectId,
      type,
      content,
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Internal server error', { status: 500 });
  }
}