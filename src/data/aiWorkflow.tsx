/**
 * NOTE: Content is rendered with react-markdown.
 * Use standard markdown for styling:
 *   **bold**, *italic*, `code`, ## Heading, etc.
 *
 * Line breaks (promptExamples content only):
 *   Single newline  → tight line break, lines directly on top of each other
 *   Blank line      → paragraph gap between sections
 *
 * Lists:
 *   Unordered: - item   or  * item
 *   Ordered:   1. item  or  1) item
 *   Separate the list from surrounding text with a blank line.
 *
 * Start each template literal line at the leftmost margin of the object
 * or it will be treated as a code block by markdown.
 */

export const aiWorkflow = {
  intro: `I use AI tools to improve my productivity while still keeping a Software Engineer's mindset. Claude Code is my main tool for AI coding, and I use Google Gemini as my rubber duck, bouncing and iterating on ideas. While AI is incredibly helpful, I still go through my own personal AI workflow whenever I build new features. This allows me to build quickly, safely, and efficiently, while still having an understanding on what I'm doing. The following are the different phases I go through when implementing new features.`,

  phases: [
    {
      number: 1,
      title: "Plan",
      description: `Before I even start coding, I brainstorm what I want to do, and how I want it to be done. I'll find methods on how best to implement this feature. I'll look up possible libraries which best suit my situation. And I'll research any possible roadblocks I may encounter. I'll then use AI tools like Google Gemini in order to brainstorm. This is where I finalize my plan and break it up into multiple smaller PRs.`,
    },
    {
      number: 2,
      title: "Prompt",
      description: `Now I build my prompt. I use my own template for this, and they're not brief. First I reference any tools I want Claude to use. The ones I use are the built in AskUserQuestion tool, and the frontend design plugin. Then I reference any documentation that can be used as reference. Then I describe the feature I want to build as clearly and as detailed as possible. This includes referencing the files I want to change, any specific style choices I want, how to implement certain functions, etc. I also almost exclusively use Claude's plan mode. This allows me to see everything Claude plans to do. For each PR I create, I create a separate initial prompt. These prompts can range from one to several paragraphs depending on the complexity of the feature.`,
    },
    {
      number: 3,
      title: "Review",
      description: `Now I review Claude's plan. This is where I look for things it may have gotten wrong. Wrong use of implementations, incorrect styles, or just not doing things how I prefer. I've caught things many times while reviewing Claude's plan before letting it run. I take note of them, then tell Claude to revise the plan with what I noticed. Once I'm happy with the plan, I let Claude build.`,
    },
    {
      number: 4,
      title: "Debug",
      description: `After Claude is done, I test the code to make sure it works as intended. I don't just tell Claude if something is wrong. I identify possible root causes by using normal software engineering methods. By using console.logs(), breakpoints, and just analyzing the behavior. I write as many details as possible on the bugs I find, as well listing the things that are working as expected. I then send Claude my findings to address the errors.`,
    },
    {
      number: 5,
      title: "Refine",
      description: `I do the debug step as many times as it takes until it's free of errors, which I only need to do a handful of times. After there are no more errors and I reviewed the code, I have completed my feature implementation.`,
    },
  ],

  promptExamples: [
    {
      title: "Building a Feature Prompt",
      content: `
  Use the AskUserQuestion tool to ask me anything regarding implementation or issues of this feature. Use the frontend design plugin for any UI implementation.
  
  Documentation:
  - docs/app-context.md
  - docs/styles.md
  - docs/features.md

  \n &nbsp;
  
  Feature to Implement:
  - I want to add a new feature to this application. (Thoroughly describe the feature)
  - Do it this way. (Describe how to implement it)
  - Use these libraries. (Describe the tools available)
  - Follow the styles mentioned in the styles.md file. (Describe the style choices)
  `,
    },
    {
      title: "Debugging Prompt",
      content: `
  Here are some issues I found with the recent change.

  - When I do this, this happens when I expect this. I believe this is due to how this library is used. Update to use it [DIFFERENT WAY].
  - When I do this, this happens and it behaves this way.
  - I can confirm that when I do this, this happens correctly.
  `,
    },
  ],
};
