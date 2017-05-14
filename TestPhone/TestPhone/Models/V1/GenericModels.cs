using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestPhone.Models.V1
{
    public enum Who
    {
        customer = 0,
        agent = 1,
        thirdParty = 3
    }

    public class GenericModels
    {
        public string AgentId { get; set; }
    }

    public class TransferCallDTO : GenericModels
    {
        public string JsonLead { get; set; }
        public int TransferCase { get; set; }
        public string TargetCampaign { get; set; }
        public string TargetAgent { get; set; }
        public string ExtAtIP { get; set; }
        public string DisplayName { get; set; }
        public string CountryCode { get; set; }
        public string Number { get; set; }
        public int TransferType { get; set; }
        public int TransferFlow { get; set; }
        public string QueueID { get; set; }
        public string SipAddress { get; set; }
    }

    public class ManualCallDTO : GenericModels
    {
        public string CampaignId { get; set; }
        public string LeadId { get; set; }
        public string NumberField { get; set; }
        public string EndCodeField { get; set; }
        public bool OverrideTimezone { get; set; }
        public string AgentId { get; set; }
    }

    public class HoldCallDTO : GenericModels
    {
        public Who Who { get; set; }
        public bool IsConferenceConsultancy { get; set; }
    }

    public class DtmfDTO : GenericModels
    {

    }

    public class ActivityDTO : GenericModels
    {
        public string CampaignId { get; set; }
        public string BreakCode { get; set; }
    }

    public class CallMaskingDTO : GenericModels
    {
        public bool IsMasking { get; set; }
    }
}