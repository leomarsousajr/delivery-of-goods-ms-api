const HttpConstants = require('src/domain/constants/HttpConstants');

describe('HTTP Status Codes', () => {
  it('should have correct status code constants', () => {
    // Informational 1xx
    expect(HttpConstants.code.CONTINUE).toBe(100);
    expect(HttpConstants.code.SWITCHING_PROTOCOLS).toBe(101);

    // Successful 2xx
    expect(HttpConstants.code.OK).toBe(200);
    expect(HttpConstants.code.CREATED).toBe(201);
    expect(HttpConstants.code.ACCEPTED).toBe(202);
    expect(HttpConstants.code.NON_AUTHORITATIVE_INFORMATION).toBe(203);
    expect(HttpConstants.code.NO_CONTENT).toBe(204);
    expect(HttpConstants.code.RESET_CONTENT).toBe(205);
    expect(HttpConstants.code.PARTIAL_CONTENT).toBe(206);

    // Redirection 3xx
    expect(HttpConstants.code.MULTIPLE_CHOICES).toBe(300);
    expect(HttpConstants.code.MOVED_PERMANENTLY).toBe(301);
    expect(HttpConstants.code.FOUND).toBe(302);
    expect(HttpConstants.code.SEE_OTHER).toBe(303);
    expect(HttpConstants.code.USE_PROXY).toBe(305);
    expect(HttpConstants.code.UNUSED).toBe(306);
    expect(HttpConstants.code.TEMPORARY_REDIRECT).toBe(307);

    // Client Error 4xx
    expect(HttpConstants.code.BAD_REQUEST).toBe(400);
    expect(HttpConstants.code.UNAUTHORIZED).toBe(401);
    expect(HttpConstants.code.PAYMENT_REQUIRED).toBe(402);
    expect(HttpConstants.code.FORBIDDEN).toBe(403);
    expect(HttpConstants.code.NOT_FOUND).toBe(404);
    expect(HttpConstants.code.METHOD_NOT_ALLOWED).toBe(405);
    expect(HttpConstants.code.NOT_ACCEPTABLE).toBe(406);
    expect(HttpConstants.code.PROXY_AUTHENTICATION_REQUIRED).toBe(407);
    expect(HttpConstants.code.REQUEST_TIMEOUT).toBe(408);
    expect(HttpConstants.code.CONFLICT).toBe(409);
    expect(HttpConstants.code.GONE).toBe(410);
    expect(HttpConstants.code.LENGTH_REQUIRED).toBe(411);
    expect(HttpConstants.code.PRECONDITION_FAILED).toBe(412);
    expect(HttpConstants.code.REQUEST_ENTITY_TOO_LARGE).toBe(413);
    expect(HttpConstants.code.REQUEST_URI_TOO_LONG).toBe(414);
    expect(HttpConstants.code.UNSUPPORTED_MEDIA_TYPE).toBe(415);
    expect(HttpConstants.code.REQUESTED_RANGE_NOT_SATISFIABLE).toBe(416);
    expect(HttpConstants.code.EXPECTATION_FAILED).toBe(417);
    expect(HttpConstants.code.I_AM_A_TEAPOT).toBe(418);
    expect(HttpConstants.code.MISDIRECTED_REQUEST).toBe(421);
    expect(HttpConstants.code.UNPROCESSABLE_ENTITY).toBe(422);
    expect(HttpConstants.code.LOCKED).toBe(423);
    expect(HttpConstants.code.FAILED_DEPENDENCY).toBe(424);
    expect(HttpConstants.code.UPGRADE_REQUIRED).toBe(426);
    expect(HttpConstants.code.TOO_MANY_REQUESTS).toBe(429);

    // Server Error 5xx
    expect(HttpConstants.code.INTERNAL_SERVER_ERROR).toBe(500);
    expect(HttpConstants.code.NOT_IMPLEMENTED).toBe(501);
    expect(HttpConstants.code.BAD_GATEWAY).toBe(502);
    expect(HttpConstants.code.SERVICE_UNAVAILABLE).toBe(503);
    expect(HttpConstants.code.GATEWAY_TIMEOUT).toBe(504);
    expect(HttpConstants.code.NOT_SUPPORTED).toBe(505);
  });

  it('should have correct status code messages', () => {
    // Informational 1xx
    expect(HttpConstants.message.CONTINUE).toBe('Continue');
    expect(HttpConstants.message.SWITCHING_PROTOCOLS).toBe('Switching Protocols');

    // Successful 2xx
    expect(HttpConstants.message.OK).toBe('Ok');
    expect(HttpConstants.message.CREATED).toBe('Created');
    expect(HttpConstants.message.ACCEPTED).toBe('Accepted');
    expect(HttpConstants.message.NON_AUTHORITATIVE_INFORMATION).toBe('Non-Authoritative Information');
    expect(HttpConstants.message.NO_CONTENT).toBe('No Content');
    expect(HttpConstants.message.RESET_CONTENT).toBe('Reset Content');

    // Redirection 3xx
    expect(HttpConstants.message.MULTIPLE_CHOICES).toBe('Multiple Choices');
    expect(HttpConstants.message.MOVED_PERMANENTLY).toBe('Moved Permanently');
    expect(HttpConstants.message.FOUND).toBe('Found');
    expect(HttpConstants.message.SEE_OTHER).toBe('See Other');
    expect(HttpConstants.message.USE_PROXY).toBe('Use Proxy');
    expect(HttpConstants.message.UNUSED).toBe('Unused');
    expect(HttpConstants.message.TEMPORARY_REDIRECT).toBe('Temporary Redirect');

    // Client Error 4xx
    expect(HttpConstants.message.BAD_REQUEST).toBe('Bad Request');
    expect(HttpConstants.message.UNAUTHORIZED).toBe('Unauthorized');
    expect(HttpConstants.message.PAYMENT_REQUIRED).toBe('Payment Required');
    expect(HttpConstants.message.FORBIDDEN).toBe('Forbidden');
    expect(HttpConstants.message.NOT_FOUND).toBe('Not Found');
    expect(HttpConstants.message.METHOD_NOT_ALLOWED).toBe('Method Not Allowed');
    expect(HttpConstants.message.NOT_ACCEPTABLE).toBe('Not Acceptable');
    expect(HttpConstants.message.PROXY_AUTHENTICATION_REQUIRED).toBe('Proxy Authentication Required');
    expect(HttpConstants.message.REQUEST_TIMEOUT).toBe('Request Timeout');
    expect(HttpConstants.message.CONFLICT).toBe('Conflict');
    expect(HttpConstants.message.GONE).toBe('Gone');
    expect(HttpConstants.message.LENGTH_REQUIRED).toBe('Length Required');
    expect(HttpConstants.message.PRECONDITION_FAILED).toBe('Precondition Failed');
    expect(HttpConstants.message.REQUEST_ENTITY_TOO_LARGE).toBe('Payload Too Large');
    expect(HttpConstants.message.REQUEST_URI_TOO_LONG).toBe('Request-URI Too Long');
    expect(HttpConstants.message.UNSUPPORTED_MEDIA_TYPE).toBe('Unsupported Media Type');
    expect(HttpConstants.message.REQUESTED_RANGE_NOT_SATISFIABLE).toBe('Requested Range Not Satisfiable');
    expect(HttpConstants.message.EXPECTATION_FAILED).toBe('Expectation Failed');
    expect(HttpConstants.message.I_AM_A_TEAPOT).toBe('Im a teapot');
    expect(HttpConstants.message.MISDIRECTED_REQUEST).toBe('Misdirected Request');
    expect(HttpConstants.message.UNPROCESSABLE_ENTITY).toBe('Unprocessable Entity');
    expect(HttpConstants.message.LOCKED).toBe('Locked');
    expect(HttpConstants.message.FAILED_DEPENDENCY).toBe('Failed Dependency');
    expect(HttpConstants.message.UPGRADE_REQUIRED).toBe('Upgrade Required');
    expect(HttpConstants.message.TOO_MANY_REQUESTS).toBe('Too Many Requests');

    // Server Error 5xx
    expect(HttpConstants.message.INTERNAL_SERVER_ERROR).toBe('Internal Server Error');
    expect(HttpConstants.message.NOT_IMPLEMENTED).toBe('Not Implemented');
    expect(HttpConstants.message.BAD_GATEWAY).toBe('Bad Gateway');
    expect(HttpConstants.message.SERVICE_UNAVAILABLE).toBe('Service Unavailable');
    expect(HttpConstants.message.GATEWAY_TIMEOUT).toBe('Gateway Timeout');
    expect(HttpConstants.message.NOT_SUPPORTED).toBe('HTTP Version Not Supported');
  });
});
