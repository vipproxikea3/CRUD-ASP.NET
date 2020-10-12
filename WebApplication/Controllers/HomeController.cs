using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using WebApplication.Models;
using WebApplication.Models.DataAccess;

namespace WebApplication.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home  
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            List<Employee> lst = new List<Employee>();
            lst = DataProvider.Instant.DB.Employees.ToList();
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Employee emp)
        {
            if (HttpContext.Request.HttpMethod == HttpMethod.Post.Method)
            {
                try
                {
                    Employee tmp = new Employee() { name = emp.name, age = emp.age, country = emp.country };
                    DataProvider.Instant.DB.Employees.Add(tmp);
                    DataProvider.Instant.DB.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch
                {
                    return Json(0, JsonRequestBehavior.AllowGet);
                }
                
            } else
            {
                return Json(0, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetbyID(int ID)
        {
            List<Employee> lst = new List<Employee>();
            lst = DataProvider.Instant.DB.Employees.ToList();
            Employee emp = lst.Find(x => x.id.Equals(ID));
            return Json(emp, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Employee emp)
        {
            if (HttpContext.Request.HttpMethod == HttpMethod.Post.Method)
            {
                try
                {
                    Employee tmp = DataProvider.Instant.DB.Employees.Where(x => x.id == emp.id).SingleOrDefault();
                    tmp.name = emp.name;
                    tmp.age = emp.age;
                    tmp.country = emp.country;
                    DataProvider.Instant.DB.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch
                {
                    return Json(0, JsonRequestBehavior.AllowGet);
                }
                
            }
            else
            {
                return Json(0, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult Delete(int ID)
        {
            if (HttpContext.Request.HttpMethod == HttpMethod.Post.Method)
            {
                try
                {
                    Employee tmp = DataProvider.Instant.DB.Employees.Where(x => x.id == ID).SingleOrDefault();
                    DataProvider.Instant.DB.Employees.Remove(tmp);
                    DataProvider.Instant.DB.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(0, JsonRequestBehavior.AllowGet);

                }
            }
            else
            {
                return Json(0, JsonRequestBehavior.AllowGet);
            }
        }
    }
}