using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebSirvce_NS.Units
{
    public class Units
    {
        public static List<DateTime> getSundays(int intMonth)
        {
            List<DateTime> lstSundays = new List<DateTime>();
            int intYear = DateTime.Now.Year;
            int intDaysThisMonth = DateTime.DaysInMonth(intYear, intMonth);
            DateTime oBeginnngOfThisMonth = new DateTime(intYear, intMonth, 1);
            for (int i = 1; i < intDaysThisMonth + 1; i++)
            {
                if (oBeginnngOfThisMonth.AddDays(i).DayOfWeek == DayOfWeek.Sunday)
                {
                    try
                    {
                        lstSundays.Add(new DateTime(intYear, intMonth, i + 1));
                    }
                    catch { }
                }
            }
            return lstSundays;
        }
    }
}