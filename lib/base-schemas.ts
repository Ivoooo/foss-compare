import { z } from "zod";

export const FeatureStatusTypeSchema = z.enum(["Yes", "No", "Paid", "Partial", "Coming Soon", "Unknown"]);

export const FeatureStatusObjectSchema = z.object({
  status: FeatureStatusTypeSchema,
  note: z.string().optional(),
  verification: z.object({
    verifiedAtVersion: z.string().optional(),
    verificationLink: z.string().url().optional(),
    dateVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD").optional(),
  }).optional(),
});

export const StrictFeatureStatusObjectSchema = z.object({
  status: FeatureStatusTypeSchema,
  note: z.string().optional(),
  verification: z.object({
    verifiedAtVersion: z.string(),
    verificationLink: z.string().url(),
    dateVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD").optional(),
  }),
});

export const FeatureStatusSchema = z.union([FeatureStatusTypeSchema, FeatureStatusObjectSchema]);
export const StrictFeatureStatusSchema = StrictFeatureStatusObjectSchema;

export const GitHubStatsSchema = z.object({
  stars: z.number(),
  forks: z.number(),
  lastCommit: z.string(),
  openIssues: z.number(),
});

export const AutomationSchema = z.object({
  docker: z.object({
    image: z.string(),
    env: z.record(z.string(), z.string()).optional(),
  }).optional(),
}).optional();

export const PerformanceSchema = z.object({
  ramUsage: z.string().optional(),
  dockerImageSize: z.string().optional(),
}).optional();

export const BaseSoftwareToolSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  website: z.string().url(),
  repository: z.string().url().optional(),
  license: z.string(),
  openSource: z.boolean(),
  githubStats: GitHubStatsSchema.optional(),
  language: z.array(z.string()),
  dockerSupport: FeatureStatusSchema,
  armSupport: FeatureStatusSchema,
  automation: AutomationSchema,
  performance: PerformanceSchema,
  notes: z.string().optional(),
  meta: z.object({
    lastCheck: z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
      version: z.string(),
      changelogLink: z.string().url().optional(),
    }),
  }).optional(),
});

// Inferred Types
export type FeatureStatusType = z.infer<typeof FeatureStatusTypeSchema>;
export type FeatureStatusObject = z.infer<typeof FeatureStatusObjectSchema>;
export type FeatureStatus = z.infer<typeof FeatureStatusSchema>;
export type GitHubStats = z.infer<typeof GitHubStatsSchema>;
export type Automation = z.infer<typeof AutomationSchema>;
export type Performance = z.infer<typeof PerformanceSchema>;
export type BaseSoftwareTool = z.infer<typeof BaseSoftwareToolSchema>;

export type FeatureItem = {
  key: string;
  label: string;
};

export type CategorySection = {
  id: string;
  label: string;
  items: FeatureItem[];
};
