using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TestPhone.Startup))]
namespace TestPhone
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
