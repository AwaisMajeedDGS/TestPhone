using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using TestPhone.Models.V1;

namespace TestPhone.Controllers.V1
{
    [RoutePrefix("api/v1/telephony")]
    public class CallFlowController : BaseController
    {

        [HttpPost]
        [Route("holdcall")]
        public async Task<IHttpActionResult> HoldCall([FromBody]HoldCallDTO holdCallDTO)
        {
            try
            {
                var status = await Task.Factory.StartNew((e) =>
                {
                    var holdCall = e as HoldCallDTO;
                    var agent = IbexProvider.IClient.LoginAgents.FirstOrDefault(x => x.ID.Equals(holdCall.AgentId));
                    if (agent != null)
                    {
                        if (holdCall.IsConferenceConsultancy)
                        {
                            switch (holdCall.Who)
                            {
                                case Who.customer:
                                    agent.HoldCustomer();
                                    break;
                                case Who.thirdParty:
                                    agent.HoldConsultant();
                                    break;
                                default:
                                    return 400;
                            }
                        }
                        else
                        {
                            agent.HoldCall();
                        }
                    }
                    else
                    {
                        return 400;
                    }

                    return 200;
                }, holdCallDTO);

                return SendResponse(status, badRequest: "Agent not found in the cache.");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("resumecall")]
        public async Task<IHttpActionResult> ResumeCall([FromBody]string agentId)
        {
            try
            {
                var status = await Task.Factory.StartNew((e) =>
                {
                    var agent = IbexProvider.IClient.LoginAgents.FirstOrDefault(x => x.ID.Equals(agentId));
                    if (agent != null)
                    {
                        agent.ResumeCall();
                    }
                    else
                    {
                        return 400;
                    }

                    return 200;
                }, agentId);

                return SendResponse(status, badRequest: "Agent not found in the cache.");
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("transfer")]
        public async Task<IHttpActionResult> TransferCall([FromBody]TransferCallDTO transferCall)
        {
            try
            {
                var status = await Task.Factory.StartNew((e) =>
                {
                    var t = e as TransferCallDTO;
                    var agent = IbexProvider.IClient.LoginAgents.FirstOrDefault(x => x.ID.Equals(t.AgentId));
                    if (agent != null)
                    {
                        switch (t.TransferCase)
                        {

                            case 2:
                                agent.CampaignBlindTransfer(t.TargetCampaign, t.JsonLead);
                                break;
                            case 3:
                                agent.IPBlindTransfer(t.SipAddress, t.DisplayName, t.JsonLead);
                                break;
                            case 4:
                                agent.QueueBlindTransfer(t.TargetCampaign, t.QueueID, t.JsonLead);
                                break;
                            case 5:
                                agent.TelcoBlindTransfer(t.CountryCode, t.Number, t.JsonLead);
                                break;
                            case 1:
                            default:
                                //agent.CompleteTransfer(t.JsonLead);
                                agent.AgentBlindTransfer(t.TargetAgent, t.TargetCampaign, t.JsonLead);
                                break;
                        }
                    }
                    else
                    {
                        return 400;
                    }

                    return 200;

                }, transferCall);

                return SendResponse(status, badRequest: "Agent not found in the cache.");
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("hangup")]
        public async Task<IHttpActionResult> HangupCall([FromBody]string agentId)
        {
            try
            {
                var status = await Task.Factory.StartNew((e) =>
                {
                    var agent = IbexProvider.IClient.LoginAgents.FirstOrDefault(x => x.ID.Equals(agentId));
                    if (agent != null)
                    {
                        agent.HangupCall();
                    }
                    else
                    {
                        return 400;
                    }

                    return 200;
                }, agentId);

                return SendResponse(status, badRequest: "Agent not found in the cache.");
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("consultancy")]
        public async Task<IHttpActionResult> ConsultancyCall([FromBody]string agentId)
        {
            try
            {
                var status = await Task.Factory.StartNew((e) =>
                {
                    var agent = IbexProvider.IClient.LoginAgents.FirstOrDefault(x => x.ID.Equals(agentId));
                    if (agent != null)
                    {
                        //need to implement accordingly to the new library
                        //IbexProvider.Client.Agents[e.ToString()].HangupCall();
                    }
                    else
                    {
                        return 400;
                    }

                    return 200;
                }, agentId);

                return SendResponse(status, badRequest: "Agent not found in the cache.");
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("conference")]
        public async Task<IHttpActionResult> ConferenceCall([FromBody]string agentId)
        {
            try
            {
                var status = await Task.Factory.StartNew((e) =>
                {
                    var agent = IbexProvider.IClient.LoginAgents.FirstOrDefault(x => x.ID.Equals(agentId));
                    if (agent != null)
                    {
                        //need to implement accordingly to the new library
                        //IbexProvider.Client.Agents[e.ToString()].HangupCall();
                    }
                    else
                    {
                        return 400;
                    }

                    return 200;
                }, agentId);

                return SendResponse(status, badRequest: "Agent not found in the cache.");
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("manualcall")]
        public async Task<IHttpActionResult> ManualCall([FromBody]ManualCallDTO manualCall)
        {
            try
            {
                var status = await Task.Factory.StartNew((e) =>
                {

                    var obj = e as ManualCallDTO;
                    var agent = IbexProvider.IClient.LoginAgents.FirstOrDefault(x => x.ID.Equals(obj.AgentId));
                    if (agent != null)
                    {
                        //need to implement accordingly to the new library
                        agent.DialManualCall(obj.CampaignId, obj.LeadId, obj.NumberField, obj.EndCodeField, obj.OverrideTimezone);
                    }
                    else
                    {
                        return 400;
                    }

                    return 200;
                }, manualCall);

                return SendResponse(status, badRequest: "Agent not found in the cache.");
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("senddtmf")]
        public async Task<IHttpActionResult> SendDTMF([FromBody]DtmfDTO dtmfDto)
        {
            try
            {

                var status = await Task.Factory.StartNew((e) =>
                {

                    var obj = e as DtmfDTO;
                    var agent = IbexProvider.IClient.LoginAgents.FirstOrDefault(x => x.ID.Equals(obj.AgentId));
                    if (agent != null)
                    {
                        //need to get the send dtmf 

                    }
                    else
                    {
                        return 400;
                    }

                    return 200;
                }, dtmfDto);

                return SendResponse(status, badRequest: "Agent not found in the cache.");

            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("mask")]
        public async Task<IHttpActionResult> CallRecordingMasking([FromBody]CallMaskingDTO cmsk)
        {
            try
            {
                var status = 200;
                var agent = IbexProvider.IClient.LoginAgents.FirstOrDefault(x => x.ID.Equals(cmsk.AgentId));
                if (agent != null)
                {
                    //need to get the send dtmf 
                    if (cmsk.IsMasking)
                    {
                        await agent.StartMasking();

                    }
                    else
                    {
                        await agent.StopMasking();
                    }
                }
                else
                {
                    status = 400;
                }

                return SendResponse(status, badRequest: "Agent not found in the cache.");
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }
    }
}