/**
 * Middleware to validate a contract update.
 *
 * @param req Request object.
 * @param res Response object.
 * @param next Next middleware.
 */
module.exports = (req, res, next) => {
  if (req.method === 'PUT') {
    const isDate = (date) =>
      typeof date !== 'boolean' &&
      new Date(date).toString() !== 'Invalid Date' &&
      !Number.isNaN(new Date(date));

    const keyTypes = {
      company: 'string',
      periodEnd: 'date',
      periodStart: 'date',
      scheduledForRenewal: 'boolean',
      negotiationRenewalDate: 'date',
    };

    const informedAttrs = Object.keys(req.body).filter(
      (attr) => attr !== 'contractId'
    );
    const missingAttrs = Object.keys(keyTypes).filter(
      (requiredKey) => !informedAttrs.includes(requiredKey)
    );

    const errors = {};
    missingAttrs.forEach((missingAttr) => {
      errors[missingAttr] = 'Please inform a value';
    });
    informedAttrs.forEach((informedAttr) => {
      if (keyTypes[informedAttr] === 'date') {
        if (!isDate(req.body[informedAttr])) {
          errors[informedAttr] = 'Please inform a valid date';
        }
        // eslint-disable-next-line valid-typeof
      } else if (typeof req.body[informedAttr] !== keyTypes[informedAttr]) {
        errors[informedAttr] = 'Please inform a valid value';
      }
    });

    if (Object.keys(errors).length > 0) {
      res.status(400).send({ errors }).end();
    } else {
      next();
    }
  } else {
    next();
  }
};
