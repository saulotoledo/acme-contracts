/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const faker = require('faker');

module.exports = () => ({
  contracts: Array(45)
    .fill(undefined)
    .map(() => ({
      company: faker.company.companyName(),
      contractId: faker.datatype
        .number({ min: 1000000, max: 5000000 })
        .toString(),
      periodEnd: faker.date.future(5),
      periodStart: faker.date.past(5),
      scheduledForRenewal: faker.datatype.boolean(),
      negotiationRenewalDate: faker.date.future(2),
    }))
    .filter(
      // Removing items with same contractId:
      (currItem, index, self) =>
        index ===
        self.findIndex((item) => item.contractId === currItem.contractId)
    ),
});
