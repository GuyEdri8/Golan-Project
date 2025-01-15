import { Header } from '@/components/projects/header'
import { ProjectGrid } from '@/components/projects/project-grid'
import { SearchBar } from '@/components/projects/search-bar'

export default function Home({ projects } : {projects : any[]}) {
  return (
    <div className="flex h-screen ">
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <Header />
          <SearchBar />
          <ProjectGrid  projects={projects}/>
        </div>
      </main>
    </div>
  )
}

 