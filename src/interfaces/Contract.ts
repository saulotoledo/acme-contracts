export default interface Contract {
  company: string;
  contractId: string;
  periodEnd: Date;
  periodStart: Date;
  scheduledForRenewal: boolean;
  negotiationRenewalDate: Date;
}
