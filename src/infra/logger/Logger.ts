const { createLogger, format, transports } = require('winston')

const levels = {
  error: 0,
  info: 2,
};

let date = new Date().toISOString()
const logFormat = format.printf(function (info: any) {
  return `${date}-${info.level}: ${JSON.stringify(info.message, null, 4)}\n`
})

export const logger = () => {
  return createLogger({
    transports: [
      new transports.Console({
        levels,
        format: format.combine(format.colorize(), format.prettyPrint()),
      }),
    ],
  })
}
