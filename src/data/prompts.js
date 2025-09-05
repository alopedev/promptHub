// Mock data for AI prompts
export const categories = [
  'All',
  'Productivity', 
  'Marketing & Sales',
  'Development & Programming',
  'Creative Writing',
  'Data Analysis',
  'Education',
  'Design & UX'
];

export const prompts = [
  {
    id: '1',
    title: 'Meeting Summary Generator',
    description: 'Transform your meeting notes into clear, actionable summaries with key takeaways and next steps.',
    category: 'Productivity',
    author: 'Sarah Chen',
    downloads: 2847,
    dateCreated: '2024-01-15',
    prompt: `Please analyze the following meeting notes and create a structured summary with:

1. **Key Topics Discussed:**
   - List the main topics covered

2. **Decisions Made:**
   - List any decisions that were finalized

3. **Action Items:**
   - Who is responsible for what
   - Deadlines if mentioned

4. **Next Steps:**
   - What needs to happen before the next meeting

5. **Questions/Concerns Raised:**
   - Any unresolved issues or questions

Meeting Notes:
[PASTE YOUR MEETING NOTES HERE]

Format the response in a clear, professional manner suitable for sharing with stakeholders.`
  },
  {
    id: '2',
    title: 'Email Campaign Copy Generator',
    description: 'Create compelling email marketing copy that converts, with subject lines and CTAs optimized for engagement.',
    category: 'Marketing & Sales',
    author: 'Marcus Rodriguez',
    downloads: 1923,
    dateCreated: '2024-01-10',
    prompt: `Create a compelling email marketing campaign with the following structure:

**Product/Service:** [DESCRIBE YOUR PRODUCT/SERVICE]
**Target Audience:** [DESCRIBE YOUR AUDIENCE]
**Campaign Goal:** [WHAT ACTION DO YOU WANT THEM TO TAKE]

Please provide:

1. **Subject Line Options (3 variations):**
   - One curiosity-driven
   - One benefit-focused  
   - One urgency-based

2. **Email Body:**
   - Attention-grabbing opening
   - Clear value proposition
   - Social proof or testimonial
   - Strong call-to-action

3. **Alternative CTAs:**
   - Primary button text
   - Secondary option
   - Urgency variant

Make the tone [SPECIFY TONE: professional/casual/friendly/urgent] and keep it under 200 words for the body.`
  },
  {
    id: '3',
    title: 'Code Review Assistant',
    description: 'Get detailed code reviews with suggestions for improvements, security issues, and best practices.',
    category: 'Development & Programming',
    author: 'Alex Kumar',
    downloads: 3156,
    dateCreated: '2024-01-08',
    prompt: `Please review the following code and provide a comprehensive analysis:

**Programming Language:** [SPECIFY LANGUAGE]
**Code Purpose:** [BRIEF DESCRIPTION]

Code to review:
\`\`\`
[PASTE YOUR CODE HERE]
\`\`\`

Please provide feedback on:

1. **Code Quality:**
   - Readability and structure
   - Naming conventions
   - Code organization

2. **Performance:**
   - Potential bottlenecks
   - Optimization opportunities
   - Memory usage concerns

3. **Security:**
   - Potential vulnerabilities
   - Input validation issues
   - Security best practices

4. **Best Practices:**
   - Language-specific conventions
   - Design patterns used/missed
   - Maintainability suggestions

5. **Specific Improvements:**
   - Line-by-line suggestions
   - Refactoring recommendations
   - Alternative approaches

Rate the code from 1-10 and provide actionable next steps.`
  },
  {
    id: '4',
    title: 'Blog Post Outline Creator',
    description: 'Generate comprehensive blog post outlines with SEO-optimized headings and content suggestions.',
    category: 'Creative Writing',
    author: 'Emma Thompson',
    downloads: 2341,
    dateCreated: '2024-01-12',
    prompt: `Create a comprehensive blog post outline for the following topic:

**Topic:** [YOUR BLOG TOPIC]
**Target Audience:** [WHO IS YOUR AUDIENCE]
**Desired Word Count:** [APPROXIMATE LENGTH]
**SEO Keywords:** [LIST 3-5 KEYWORDS TO INCLUDE]

Please provide:

1. **SEO-Optimized Title Options (3 variations)**
2. **Meta Description (150-160 characters)**
3. **Introduction Hook Ideas**
4. **Main Section Structure:**
   - H2 headings with brief descriptions
   - H3 subheadings where appropriate
   - Key points to cover in each section
   
5. **Content Enhancement Suggestions:**
   - Where to include statistics/data
   - Potential case studies or examples
   - Images or media recommendations
   
6. **Call-to-Action Ideas**
7. **Internal/External Linking Opportunities**

Make sure the outline follows SEO best practices and provides clear value to readers.`
  },
  {
    id: '5',
    title: 'Data Analysis Report Generator',
    description: 'Transform raw data into insightful reports with key findings, trends, and actionable recommendations.',
    category: 'Data Analysis',
    author: 'Dr. Michael Foster',
    downloads: 1687,
    dateCreated: '2024-01-05',
    prompt: `Analyze the following data and create a comprehensive report:

**Data Type:** [DESCRIBE YOUR DATA - sales, user analytics, survey results, etc.]
**Analysis Period:** [TIME RANGE]
**Business Context:** [WHY THIS ANALYSIS MATTERS]

Data:
[PASTE YOUR DATA OR DESCRIBE THE DATASET]

Please provide:

1. **Executive Summary:**
   - Top 3 key findings
   - Overall trend assessment
   - Critical insights for decision-makers

2. **Detailed Analysis:**
   - Statistical breakdown
   - Trend identification
   - Pattern recognition
   - Anomaly detection

3. **Visual Recommendations:**
   - Best chart types for this data
   - Key metrics to highlight
   - Dashboard suggestions

4. **Business Implications:**
   - What these findings mean
   - Potential risks or opportunities
   - Market context

5. **Actionable Recommendations:**
   - Immediate actions to take
   - Long-term strategic suggestions
   - Success metrics to track

6. **Next Steps:**
   - Additional data to collect
   - Follow-up analysis needed
   - Timeline for implementation`
  },
  {
    id: '6',
    title: 'Learning Path Creator',
    description: 'Design personalized learning curricula with resources, milestones, and skill assessments.',
    category: 'Education',
    author: 'Prof. Lisa Wang',
    downloads: 2093,
    dateCreated: '2024-01-14',
    prompt: `Create a comprehensive learning path for the following:

**Subject/Skill:** [WHAT DO YOU WANT TO LEARN]
**Current Level:** [BEGINNER/INTERMEDIATE/ADVANCED]
**Time Available:** [HOURS PER WEEK]
**Learning Goal:** [SPECIFIC OBJECTIVE]
**Preferred Learning Style:** [VISUAL/AUDITORY/HANDS-ON/MIXED]

Please design:

1. **Learning Objectives:**
   - Clear, measurable goals
   - Skill milestones
   - Success criteria

2. **Structured Curriculum:**
   - Week-by-week breakdown
   - Prerequisites for each module
   - Estimated time per topic

3. **Resource Recommendations:**
   - Books, courses, tutorials
   - Free vs paid options
   - Hands-on practice materials

4. **Assessment Methods:**
   - Self-evaluation checkpoints
   - Project-based learning
   - Knowledge validation tests

5. **Practical Applications:**
   - Real-world projects
   - Portfolio pieces
   - Skill demonstration opportunities

6. **Progress Tracking:**
   - Milestones and deadlines
   - Skill assessment rubrics
   - Motivation maintenance tips

Include both theoretical knowledge and practical application opportunities.`
  },
  {
    id: '7',
    title: 'UX Research Summary',
    description: 'Convert user research data into actionable design insights with clear recommendations and next steps.',
    category: 'Design & UX',
    author: 'Jordan Kim',
    downloads: 1456,
    dateCreated: '2024-01-06',
    prompt: `Analyze the following UX research data and create actionable insights:

**Research Method:** [USER INTERVIEWS/SURVEYS/USABILITY TESTS/etc.]
**Product/Feature:** [WHAT WAS BEING TESTED]
**User Segment:** [WHO PARTICIPATED]
**Research Questions:** [WHAT YOU WANTED TO LEARN]

Research Data:
[PASTE YOUR RESEARCH FINDINGS, QUOTES, OBSERVATIONS]

Please provide:

1. **Key Findings Summary:**
   - Top 3 critical insights
   - User behavior patterns
   - Unexpected discoveries

2. **User Pain Points:**
   - Prioritized list of issues
   - Impact severity assessment
   - User quotes supporting findings

3. **Opportunities Identified:**
   - Design improvement areas
   - Feature enhancement suggestions
   - Innovation possibilities

4. **Design Recommendations:**
   - Immediate fixes (quick wins)
   - Medium-term improvements
   - Long-term strategic changes

5. **User Personas/Journey Updates:**
   - Refined user profiles
   - Journey map insights
   - Behavioral pattern updates

6. **Next Steps:**
   - Additional research needed
   - Prototype requirements
   - Success metrics to track

Format findings for easy sharing with design and product teams.`
  },
  {
    id: '8',
    title: 'Social Media Content Planner',
    description: 'Generate a month\'s worth of engaging social media content with optimal posting schedules.',
    category: 'Marketing & Sales',
    author: 'Taylor Swift',
    downloads: 3421,
    dateCreated: '2024-01-20',
    prompt: `Create a comprehensive social media content plan:

**Brand/Business:** [YOUR BRAND NAME]
**Industry:** [YOUR INDUSTRY]
**Target Audience:** [DESCRIBE YOUR AUDIENCE]
**Platforms:** [INSTAGRAM/LINKEDIN/TWITTER/TIKTOK/etc.]
**Brand Voice:** [PROFESSIONAL/CASUAL/HUMOROUS/INSPIRATIONAL]
**Content Pillars:** [EDUCATION/ENTERTAINMENT/PROMOTION/COMMUNITY]

Please create:

1. **Content Calendar (30 days):**
   - Daily post ideas with themes
   - Optimal posting times
   - Content type variety

2. **Post Templates:**
   - Educational posts
   - Behind-the-scenes content
   - User-generated content ideas
   - Promotional posts (following 80/20 rule)

3. **Engagement Strategies:**
   - Question prompts for comments
   - Poll and story ideas
   - Community building activities

4. **Hashtag Strategy:**
   - Branded hashtags
   - Industry-relevant tags
   - Trending hashtag opportunities

5. **Visual Content Ideas:**
   - Image concepts
   - Video content suggestions
   - Graphic design needs

6. **Performance Metrics:**
   - KPIs to track
   - Success benchmarks
   - Optimization opportunities

Include variety in format, tone, and engagement type while maintaining brand consistency.`
  },
  {
    id: '9',
    title: 'Smart Text Summarizer',
    description: 'Extract facts from any text and create structured bulletpoint summaries with relevant emoji indicators.',
    category: 'Data Analysis',
    author: 'David Park',
    downloads: 1867,
    dateCreated: '2024-01-18',
    prompt: `Extract all facts from the text and summarize it in all relevant aspects in up to seven bulletpoints and a 1-liner summary. Pick a good matching emoji for every bullet point.

Text: {selection}

Summary:`
  }
];

// Helper function to get prompts by category
export const getPromptsByCategory = (category) => {
  if (category === 'All') return prompts;
  return prompts.filter(prompt => prompt.category === category);
};

// Helper function to search prompts with security validation
export const searchPrompts = (query, category = 'All') => {
  let filteredPrompts = getPromptsByCategory(category);
  
  // Validate and sanitize the query
  if (!query || typeof query !== 'string') return filteredPrompts;
  
  // Additional security: limit query length and remove potentially dangerous characters
  const safeQuery = query
    .replace(/[<>"'&]/g, '') // Remove potentially dangerous characters
    .trim()
    .substring(0, 100) // Limit length
    .toLowerCase();
  
  if (!safeQuery) return filteredPrompts;
  
  return filteredPrompts.filter(prompt => 
    prompt.title.toLowerCase().includes(safeQuery) ||
    prompt.description.toLowerCase().includes(safeQuery) ||
    prompt.author.toLowerCase().includes(safeQuery)
  );
};
