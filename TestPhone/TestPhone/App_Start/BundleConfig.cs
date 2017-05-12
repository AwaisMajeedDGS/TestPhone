using System.Web;
using System.Web.Optimization;

namespace TestPhone
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
            bundles.Add(new ScriptBundle("~/bundles/app/libs").Include(
                    "~/core/libs/smart-table/smart-table.js",
                    "~/core/libs/smart-table/sortable.js",
                     "~/core/libs/smart-table/dirPagination.js",
                    "~/core/libs/Lodash/lodash.js",
                    "~/core/libs/seleci/seleci.js",
                    "~/core/libs/seleci/ng-seleci.js",
                    "~/core/libs/angular-pageslide/angular-pageslide-directive.js",
                    "~/core/libs/smart-table/lrDragNDrop.js"
                    ));
            bundles.Add(new ScriptBundle("~/bundles/app/core").Include(
             "~/core/modules/WebDialer/services/webdialerSrvc.js",
             "~/core/modules/WebDialer/controllers/webdialerController.js",
             "~/core/modules/WebDialer/webdialerModule.js",

             "~/core/app.js"
              ));
        }
    }
}
