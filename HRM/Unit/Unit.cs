using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM.Unit
{
    public class Unit
    {
        public static string FirstDayOfMonth(int month, int year)
        {
            return year + "-" + month + "-01";
        }

        public static string LastDayOfMOnth(int month, int year)
        {
            return year + "-" + month + "-" + DateTime.DaysInMonth(year, month);
        }
    }
}