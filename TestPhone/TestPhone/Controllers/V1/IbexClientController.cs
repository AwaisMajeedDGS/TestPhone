using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using TestPhone.Models.V1;

namespace TestPhone.Controllers.V1
{
    [RoutePrefix("api/v1/client")]
    public class IbexClientController : BaseController
    {
        [HttpPost]
        [Route("login")]
        public async Task<IHttpActionResult> ClientLogin([FromBody]ClientLoginDTO clientDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var result = IbexProvider.IClient.LoginAgent(clientDTO.AgentId, clientDTO.Password, clientDTO.Campaigns);                
                await result.AttachEvents();
                _AgentCollection.TryAdd(clientDTO.AgentId, result);

                return Ok(result);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("logout")]
        public async Task<IHttpActionResult> ClientLogout([FromBody]ClientLogoutDTO clientDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var status = 400;

                var agent = IbexProvider.IClient.LoginAgents.FirstOrDefault(x => x.ID.Equals(clientDTO.AgentId));
                if (agent != null)
                {
                    //need to implement accordingly to the new library                    
                    var success = IbexProvider.IClient.LogoutAgent(agent, clientDTO.IsForce);
                    if (success)
                        status = 200;
                }

                return SendResponse(status, badRequest: "Agent not found in the cache.");

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

    }

    public class ClientLoginDTO
    {
        [Required]
        public string AgentId { get; set; }

        [Required]
        public List<string> Campaigns { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class ClientLogoutDTO
    {
        [Required]
        public string AgentId { get; set; }

        public bool IsForce { get; set; }
    }
}