using System.Configuration;
using System.Threading.Tasks;
using TRG.WebDialer.DialerClient;

namespace TestPhone.Models.V1
{
    public static class IbexProvider
    {

        internal static IClient IClient;

        static IbexProvider()
        {
            var dialerUrl = ConfigurationManager.AppSettings["DialerUrl"];
            var leadServiceUrl = ConfigurationManager.AppSettings["LeadServiceUrl"];

            IClient = Client.Instance;
            IClient.Initialize(dialerUrl, leadServiceUrl);
        }
    }


    public static class Extensions
    {
        static AgentCallbacks _AgentCallback = new AgentCallbacks();

        public static Task AttachEvents(this IAgent agent)
        {
            agent.OnBreak += _AgentCallback.Agent_OnBreakCallback;
            agent.OnCall += _AgentCallback.Agent_OnCallCallback;
            agent.OnCampaignLogout += _AgentCallback.Agent_OnCampaignLogoutCallback;
            agent.OnConferenceStateChange += _AgentCallback.Agent_OnConferenceStateChangeCallback;
            agent.OnConsultHoldToggle += _AgentCallback.Agent_OnConsultHoldToggleCallback;
            agent.OnHoldStateChange += _AgentCallback.Agent_OnHoldStateChangeCallback;
            agent.OnLeadChange += _AgentCallback.Agent_OnLeadChangeCallback;
            agent.OnPlayMessageComplete += _AgentCallback.Agent_OnPlayMessageCompleteCallback;
            agent.OnRecordingStateChange += _AgentCallback.Agent_OnRecordingStateChangeCallback;
            agent.OnSupervisorMessage += _AgentCallback.Agent_OnSupervisorMessageCallback;
            agent.OnTalk += _AgentCallback.Agent_OnTalkCallback;
            agent.OnVoiceStateChange += _AgentCallback.Agent_OnVoiceStateChangeCallback;
            agent.OnWait += _AgentCallback.Agent_OnWaitCallback;
            agent.OnWrapup += _AgentCallback.Agent_OnWrapupCallback;
            return Task.FromResult(0);
        }
    }
    
    public class AgentCallbacks
        {
            public void Agent_OnWrapupCallback(object sender, CallEventArgs e)
            {
                //SignalRNotificationBlaster.AgentOnWrapupBlast(e);
            }

            public void Agent_OnWaitCallback(object sender, AgentEventArgs e)
            {
                //SignalRNotificationBlaster.AgentOnWaitBlast(e);
            }

            public void Agent_OnVoiceStateChangeCallback(object sender, AgentEventArgs e)
            {
                //SignalRNotificationBlaster.AgentOnVoiceStateChangeBlast(e);
            }

            public void Agent_OnTalkCallback(object sender, CallEventArgs e)
            {
                //SignalRNotificationBlaster.AgentOnTalkBlast(e);
            }

            public void Agent_OnSupervisorMessageCallback(object sender, AgentEventArgs e)
            {
                //SignalRNotificationBlaster.AgentOnSupervisorMessageBlast(e);
            }

            public void Agent_OnRecordingStateChangeCallback(object sender, CallEventArgs e)
            {
                //SignalRNotificationBlaster.AgentOnRecordingStateChangeBlast(e);
            }

            public void Agent_OnPlayMessageCompleteCallback(object sender, CallEventArgs e)
            {
                //SignalRNotificationBlaster.AgentOnPlayMessageCompleteBlast(e);
            }

            public void Agent_OnLeadChangeCallback(object sender, CallEventArgs e)
            {
                //SignalRNotificationBlaster.AgentOnLeadChangeBlast(e);
            }

            public void Agent_OnHoldStateChangeCallback(object sender, CallEventArgs e)
            {
                //SignalRNotificationBlaster.AgentOnHoldStateChangeBlast(e);
            }

            public void Agent_OnConsultHoldToggleCallback(object sender, CallEventArgs e)
            {
                //SignalRNotificationBlaster.AgentOnConsultHoldToggleBlast(e);
            }

            public void Agent_OnConferenceStateChangeCallback(object sender, CallEventArgs e)
            {
                //SignalRNotificationBlaster.AgentOnConferenceStateChangeBlast(e);
            }

            public void Agent_OnCampaignLogoutCallback(object sender, AgentEventArgs e)
            {
                //SignalRNotificationBlaster.AgentOnCampaignLogoutBlast(e);
            }

            public void Agent_OnCallCallback(object sender, CallEventArgs e)
            {
                //SignalRNotificationBlaster.AgentOnCallBlast(e);
            }

            public void Agent_OnBreakCallback(object sender, AgentEventArgs e)
            {
                //SignalRNotificationBlaster.AgentOnBreakBlast(e);
            }
        }
    

}