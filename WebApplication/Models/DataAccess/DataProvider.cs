using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.DataAccess
{
    public class DataProvider
    {
        private static DataProvider _instant;
        public static DataProvider Instant
        {
            get
            {
                if (_instant == null)
                    _instant = new DataProvider();
                return _instant;
            }
            set
            {
                _instant = value;
            }

        }
        public UserManagerEntities DB { get; set; }
        private DataProvider()
        {
            DB = new UserManagerEntities();
        }
    }
}