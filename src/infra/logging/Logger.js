const log4js = require('log4js');
// podemos colocar aqui um application insights com process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' para ser enviado apenas em produção
// Microsoft Azure App Insights / Datadog

log4js.configure({
  appenders: {
    console: { type: 'console' } // Envia logs para o console
  },
  categories: {
    default: { appenders: ['console'], level: 'debug' } // Configura o nível de log padrão
  }
});

module.exports = log4js.getLogger();
