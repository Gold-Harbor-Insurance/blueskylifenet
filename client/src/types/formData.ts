export interface FormDataPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zipCode: string;
}

export type FlowType = 'seniors' | 'veterans' | 'first_responders' | 'seniors_nsbrk' | 'veterans_nsbrk' | 'first_responders_nsbrk';
export type CallExperience = 'tap-to-call' | 'display-number';
