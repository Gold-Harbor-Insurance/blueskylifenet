import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { USState } from "@shared/schema";

const US_STATES: USState[] = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

interface StateSelectorProps {
  value?: string;
  onValueChange: (value: string) => void;
}

export default function StateSelector({ value, onValueChange }: StateSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger 
        className="h-14 md:h-16 text-lg bg-background border-2 border-border hover:border-primary transition-colors rounded-xl"
        data-testid="select-state"
      >
        <SelectValue placeholder="Select your state..." />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {US_STATES.map((state) => (
          <SelectItem key={state} value={state} className="text-lg">
            {state}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
