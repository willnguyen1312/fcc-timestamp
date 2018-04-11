const moment = require("moment");
const Joi = require("joi");

const regex = /\S+ \d{1,2}, \d{4}/;

const schema = Joi.object().keys({
  unix: Joi.number(),
  natural: Joi.string().regex(regex)
});
function hello(ctx) {
  // const day = moment.unix(1450137600);

  // console.log(day.format(`MMMM D, YYYY`));

  // const str = `December 15, 2015`;
  // console.log(moment(str, `MMMM D, YYYY`).unix() + 25200);

  // console.log(1450112400 - 1450137600);
  let result = {
    unix: undefined,
    natural: undefined
  };

  const query = ctx.params.query;

  if (query.indexOf(" ") === -1) {
    const natural = moment.unix(query).format(`MMMM D, YYYY`);
    result = {
      unix: Number(query),
      natural
    };
  } else {
    const unixNumber = moment(query, `MMMM D, YYYY`).unix() + 25200;
    result = {
      unix: unixNumber,
      natural: query
    };
  }
  const valid = Joi.validate(result, schema);
  if (valid.error) {
    result.unix = null;
    result.natural = null;
  }

  ctx.body = result;
}

module.exports = {
  hello
};
