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

export const firstResponderAgencySchema = z.enum([
  "Law enforcement",
  "Fire and rescue",
  "Emergency Medical Services",
  "Public safety communications",
  "Other critical first responders"
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
  "Family",
  "Other"
]);

export const coverageAmountSchema = z.enum([
  "Under $10,000",
  "$10,000-$24,999",
  "$25,000-$50,000",
  "Over $50,000"
]);

export const monthlyBudgetSchema = z.enum([
  "$50–$74",
  "$75–$99",
  "$100–$149",
  "Over$150"
]);

export const genderSchema = z.enum([
  "Male",
  "Female"
]);

export const lifeInsuranceStatusSchema = z.enum([
  "Yes",
  "No"
]);

export const cashAmountSchema = z.enum([
  "Under$10000",
  "$10000-$24999",
  "$25000-$50000",
  "Over$50000"
]);

// New comprehensive quiz schema with all 13 questions (hobby and county removed)
export const seniorQuizSchema = z.object({
  gender: genderSchema,
  hasLifeInsurance: lifeInsuranceStatusSchema,
  cashAmount: cashAmountSchema,
  beneficiary: beneficiarySchema,
  age: z.string(),
  beneficiaryName: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  zipCode: z.string().regex(/^\d{5}$/),
  email: z.string().email(),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/),
  streetAddress: z.string().min(1),
  city: z.string().min(1),
  state: usStateSchema,
});

export const veteranQuizSchema = z.object({
  militaryBranch: militaryBranchSchema,
  gender: genderSchema,
  hasLifeInsurance: lifeInsuranceStatusSchema,
  cashAmount: cashAmountSchema,
  beneficiary: beneficiarySchema,
  age: z.string(),
  beneficiaryName: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  zipCode: z.string().regex(/^\d{5}$/),
  email: z.string().email(),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/),
  streetAddress: z.string().min(1),
  city: z.string().min(1),
  state: usStateSchema,
});

export const firstResponderQuizSchema = z.object({
  agency: firstResponderAgencySchema,
  gender: genderSchema,
  hasLifeInsurance: lifeInsuranceStatusSchema,
  cashAmount: cashAmountSchema,
  beneficiary: beneficiarySchema,
  age: z.string(),
  beneficiaryName: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  zipCode: z.string().regex(/^\d{5}$/),
  email: z.string().email(),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/),
  streetAddress: z.string().min(1),
  city: z.string().min(1),
  state: usStateSchema,
});

export type VeteranQuizData = z.infer<typeof veteranQuizSchema>;
export type SeniorQuizData = z.infer<typeof seniorQuizSchema>;
export type FirstResponderQuizData = z.infer<typeof firstResponderQuizSchema>;
export type MilitaryBranch = z.infer<typeof militaryBranchSchema>;
export type FirstResponderAgency = z.infer<typeof firstResponderAgencySchema>;
export type USState = z.infer<typeof usStateSchema>;
export type AgeRange = z.infer<typeof ageRangeSchema>;
export type Beneficiary = z.infer<typeof beneficiarySchema>;
export type CoverageAmount = z.infer<typeof coverageAmountSchema>;
export type MonthlyBudget = z.infer<typeof monthlyBudgetSchema>;
export type Gender = z.infer<typeof genderSchema>;
export type LifeInsuranceStatus = z.infer<typeof lifeInsuranceStatusSchema>;
export type CashAmount = z.infer<typeof cashAmountSchema>;
