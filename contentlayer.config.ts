import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/*.mdx",
  contentType: "mdx",
  fields: {
    title:       { type: "string",  required: true },
    description: { type: "string",  required: true },
    date:        { type: "date",    required: true },
    tags:        { type: "list", of: { type: "string" }, required: true },
    category:    { type: "enum", options: ["android", "web", "ai", "desktop"], required: true },
    featured:    { type: "boolean", default: false },
    githubUrl:   { type: "string",  required: false },
    liveUrl:     { type: "string",  required: false },
    coverImage:  { type: "string",  required: false },
    status:      { type: "enum", options: ["production", "capstone", "personal"], required: true },
    role:        { type: "string",  required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(".mdx", ""),
    },
    url: {
      type: "string",
      resolve: (doc) => `/projects/${doc._raw.sourceFileName.replace(".mdx", "")}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Project],
});
