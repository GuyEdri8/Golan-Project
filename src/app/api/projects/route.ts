// /pages/api/projects.ts
import { getProjectsByDepartment,getProjectsByDepartmentAndSettlement } from '@/lib/queries/getProjectsByDepartment';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const departmentId = searchParams.get('departmentId')

  if (!departmentId) {
    return NextResponse.json({ error: 'Missing departmentId' }, {status: 400})
  }

  // Simulate fetching projects for the department
  // const projects = await getProjectsByDepartment(departmentId);
  const projects = await getProjectsByDepartmentAndSettlement(departmentId);

  return NextResponse.json(projects)
}
