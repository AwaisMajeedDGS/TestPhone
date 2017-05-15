using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TRG.WebDialer.DialerClient;

namespace TestPhone.Controllers.V1
{
    public class BaseController : ApiController
    {
        
        public static ConcurrentDictionary<string, IAgent> _AgentCollection = new ConcurrentDictionary<string, IAgent>();

        protected IHttpActionResult SendResponse(int statusCode, object successData = null, string badRequest = "", Exception ex = null)
        {
            switch (statusCode)
            {
                case 200:
                    if (successData != null)
                    {
                        return Ok(successData);
                    }
                    else
                    {
                        return Ok();
                    }
                case 400:
                    return BadRequest(badRequest);
                default:
                    return InternalServerError(ex);

            }
        }

    }
}