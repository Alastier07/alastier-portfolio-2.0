import { mockProjects, mockSkills, mockExperiences, Project, Skill, Experience } from './mock-data';
import { supabase } from './supabase';

// Helper to determine if we should use mock data.
// In a real scenario, you might toggle this based on an env var or the presence of valid Supabase keys.
const USE_MOCK_DATA = true;

export async function getProjects(): Promise<Project[]> {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockProjects;
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data as Project[];
}

export async function getSkills(): Promise<Skill[]> {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockSkills;
  }

  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('level', { ascending: false });

  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }

  return data as Skill[];
}

export async function getExperiences(): Promise<Experience[]> {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockExperiences;
  }

  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    // We assume a 'sort_order' or we could order by start_date descending.
    // In actual usage, ordering by created_at or start_date works.
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }

  return data as Experience[];
}
