import { createClient } from "next-sanity";

const client = createClient({
  projectId: "8fzky4zl",
  dataset: "production",    
  apiVersion: "1",
  })

  export default client