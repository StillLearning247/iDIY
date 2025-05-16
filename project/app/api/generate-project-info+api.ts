import { allProjects } from '@/data/projects';

interface ProjectUpdatePayload {
  projectId: string;
  type: 'description' | 'safety' | 'steps';
  content: string;
}

export async function POST(request: Request) {
  try {
    const payload: ProjectUpdatePayload = await request.json();
    const { projectId, type, content } = payload;

    // Validate payload
    if (!projectId || !type || !content) {
      return new Response('Invalid payload', { status: 400 });
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
    console.error('Error processing request:', error);
    return new Response('Internal server error', { status: 500 });
  }
}