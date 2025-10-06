import { z } from "zod";

// Quiz form data schemas
export const militaryBranchSchema = z.enum([
  "Army",
  "Marine Corps",
  "Navy",
  "Air Force",
  "Coast Guard",
  "Space Force"
]);

export const usStateSchema = z.enum([
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", 
  "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", 
  "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
  "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", 
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", 
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
  "West Virginia", "Wisconsin", "Wyoming"
]);

export const ageRangeSchema = z.enum([
  "Under 45",
  "45-85",
  "Over 85"
]);

export const beneficiarySchema = z.enum([
  "Spouse",
  "Children",
  "Grandchildren",
  "Family Member"
]);

export const coverageAmountSchema = z.enum([
  "Under $10,000",
  "$10,000-$24,999",
  "$25,000-$50,000",
  "Over $50,000"
]);

export const monthlyBudgetSchema = z.enum([
  "Less than $50/month",
  "$50–$74/month",
  "$75–$99/month",
  "$100–$149/month",
  "$150+/month"
]);

export const veteranQuizSchema = z.object({
  militaryBranch: militaryBranchSchema,
  state: usStateSchema,
  age: ageRangeSchema,
  beneficiary: beneficiarySchema,
  coverage: coverageAmountSchema,
  budget: monthlyBudgetSchema,
});

export const seniorQuizSchema = z.object({
  state: usStateSchema,
  age: ageRangeSchema,
  beneficiary: beneficiarySchema,
  coverage: coverageAmountSchema,
  budget: monthlyBudgetSchema,
});

export type VeteranQuizData = z.infer<typeof veteranQuizSchema>;
export type SeniorQuizData = z.infer<typeof seniorQuizSchema>;
export type MilitaryBranch = z.infer<typeof militaryBranchSchema>;
export type USState = z.infer<typeof usStateSchema>;
export type AgeRange = z.infer<typeof ageRangeSchema>;
export type Beneficiary = z.infer<typeof beneficiarySchema>;
export type CoverageAmount = z.infer<typeof coverageAmountSchema>;
export type MonthlyBudget = z.infer<typeof monthlyBudgetSchema>;
