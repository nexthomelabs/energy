import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, Calendar, DollarSign, 
  BarChart2, PieChart, ArrowUp, ArrowDown
} from 'lucide-react';
import { useAnalyticsStore } from '../../store/analyticsStore';
import { format, parseISO } from 'date-fns';
import Card from '../../components/common/Card';

const Analytics = () => {
  const { dailyStats, serviceStats, clientStats, loading, fetchAnalytics } = useAnalyticsStore();
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'year'>('week');

  useEffect(() => {
    fetchAnalytics('1', dateRange);
  }, [dateRange, fetchAnalytics]);

  const calculateTotals = () => {
    return dailyStats.reduce((acc, day) => ({
      bookings: acc.bookings + day.bookings,
      revenue: acc.revenue + day.revenue,
      newClients: acc.newClients + day.newClients,
      completedServices: acc.completedServices + day.completedServices
    }), {
      bookings: 0,
      revenue: 0,
      newClients: 0,
      completedServices: 0
    });
  };

  const totals = calculateTotals();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart2 className="w-6 h-6 text-primary-600 mr-2" />
          <h1 className="text-2xl font-bold">Analytics</h1>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value as 'week' | 'month' | 'year')}
          className="px-3 py-2 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        >
          <option value="week">Last 7 days</option>
          <option value="month">Last 30 days</option>
          <option value="year">Last year</option>
        </select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              <span className="text-xs text-success-600 flex items-center">
                <ArrowUp className="w-3 h-3 mr-1" />
                12%
              </span>
            </div>
            <p className="text-sm text-neutral-600">Total Bookings</p>
            <p className="text-2xl font-bold">{totals.bookings}</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-success-600" />
              <span className="text-xs text-success-600 flex items-center">
                <ArrowUp className="w-3 h-3 mr-1" />
                8%
              </span>
            </div>
            <p className="text-sm text-neutral-600">Revenue</p>
            <p className="text-2xl font-bold">${totals.revenue}</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-secondary-600" />
              <span className="text-xs text-success-600 flex items-center">
                <ArrowUp className="w-3 h-3 mr-1" />
                15%
              </span>
            </div>
            <p className="text-sm text-neutral-600">New Clients</p>
            <p className="text-2xl font-bold">{totals.newClients}</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-accent-600" />
              <span className="text-xs text-error-600 flex items-center">
                <ArrowDown className="w-3 h-3 mr-1" />
                3%
              </span>
            </div>
            <p className="text-sm text-neutral-600">Completed Services</p>
            <p className="text-2xl font-bold">{totals.completedServices}</p>
          </Card>
        </motion.div>
      </div>

      {/* Revenue Chart */}
      <Card className="p-4 mb-8">
        <h2 className="text-lg font-medium mb-4">Revenue Trend</h2>
        <div className="h-64">
          <div className="flex h-full items-end space-x-2">
            {dailyStats.slice(-7).map((day, index) => (
              <div
                key={day.date}
                className="flex-1 flex flex-col items-center"
              >
                <motion.div
                  className="w-full bg-primary-200 rounded-t"
                  style={{
                    height: `${(day.revenue / 1000) * 100}%`
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.revenue / 1000) * 100}%` }}
                  transition={{ delay: index * 0.1 }}
                />
                <p className="text-xs text-neutral-600 mt-2">
                  {format(parseISO(day.date), 'MMM d')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Popular Services */}
      <Card className="p-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Popular Services</h2>
          <PieChart className="w-5 h-5 text-neutral-400" />
        </div>
        <div className="space-y-4">
          {serviceStats.map((service, index) => (
            <motion.div
              key={service.serviceId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{service.serviceName}</span>
                <span className="text-sm text-neutral-600">
                  ${service.revenue}
                </span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full">
                <motion.div
                  className="h-full bg-primary-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${service.percentageOfTotal}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
              <div className="flex justify-between text-sm text-neutral-600 mt-1">
                <span>{service.bookings} bookings</span>
                <span>{service.percentageOfTotal}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Client Insights */}
      <Card className="p-4">
        <h2 className="text-lg font-medium mb-4">Client Insights</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-neutral-600">Total Clients</p>
            <p className="text-xl font-bold">{clientStats.totalClients}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-neutral-600">New vs Returning</p>
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${(clientStats.newClients / clientStats.totalClients) * 100}%` }}
                />
              </div>
              <span className="text-sm text-neutral-600">
                {Math.round((clientStats.newClients / clientStats.totalClients) * 100)}%
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-neutral-600">Avg. Visits/Client</p>
            <p className="text-xl font-bold">{clientStats.averageVisitsPerClient}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-neutral-600">Retention Rate</p>
            <p className="text-xl font-bold">{clientStats.retentionRate}%</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
