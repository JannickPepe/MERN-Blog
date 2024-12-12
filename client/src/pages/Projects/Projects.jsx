import { ProjectCards } from "../../components/Projects/ProjectCards";
import { ProjectsCategoryTabs } from "../../components/Projects/ProjectCategoryTab";


export default function Projects() {
  return (
    <main>
      <section className='max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 py-3 px-3'>
        <h1 className='text-3xl font-semibold'>
          Projects
        </h1>
        <p className='text-md text-gray-500'>
          Build fun and engaging projects while learning HTML, CSS, and JavaScript!
        </p>
      </section>

      <section className="max-w-6xl mx-auto"> 
        <ProjectsCategoryTabs />
      </section>

      <section>
        <ProjectCards />
      </section>
    </main>
  )
}