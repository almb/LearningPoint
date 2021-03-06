﻿using Oxyplot.TrackerWithGrid.OxyplotExtensions;
using OxyPlot;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Data;

namespace Oxyplot.TrackerWithGrid.Convertor
{
    public class TrackerHitResultConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if(value is TrackerHitResult data)
            {
                return (data.Item as ExtendedDataPoint).ItemsSold;
            }
            return null;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
