import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import faq from './sanity/schemas/faq-schema'
import schemas from './sanity/schemas'; 

const config = defineConfig({
  projectId: "8fzky4zl",
  dataset: "production",
  title: "Mimir Analysis",
  apiVersion: "1",
  basePath: "/admin",
  plugins: [deskTool()],
  schema: {types: schemas}
})

export default config