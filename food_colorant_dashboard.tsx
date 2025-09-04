import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Shield, TrendingUp, Package } from 'lucide-react';

const Dashboard = () => {
  // Risk distribution data
  const riskData = [
    { name: 'High-risk products', value: 45, percentage: 64, color: '#ef4444' },
    { name: 'Low-risk products', value: 25, percentage: 36, color: '#22c55e' }
  ];

  // Top hazardous colorants data
  const colorantsData = [
    { name: 'Sunset Yellow (E110)', count: 18, code: 'E110' },
    { name: 'Tartrazine (E102)', count: 15, code: 'E102' },
    { name: 'Allura Red (E129)', count: 12, code: 'E129' },
    { name: 'Carmoisine (E122)', count: 10, code: 'E122' },
    { name: 'Ponceau 4R (E124)', count: 8, code: 'E124' }
  ];

  // Category-wise analysis data (sample data based on typical food categories)
  const categoryData = [
    { category: 'Drinks', total: 12, highRisk: 10, lowRisk: 2, riskPercentage: 83 },
    { category: 'Chips', total: 15, highRisk: 11, lowRisk: 4, riskPercentage: 73 },
    { category: 'Biscuits', total: 18, highRisk: 12, lowRisk: 6, riskPercentage: 67 },
    { category: 'Chocolate', total: 10, highRisk: 6, lowRisk: 4, riskPercentage: 60 },
    { category: 'Dairy', total: 8, highRisk: 3, lowRisk: 5, riskPercentage: 38 },
    { category: 'Others', total: 7, highRisk: 3, lowRisk: 4, riskPercentage: 43 }
  ];

  const COLORS = ['#ef4444', '#22c55e'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{payload[0].payload.name}</p>
          <p className="text-sm text-gray-600">
            Count: {payload[0].value} ({payload[0].payload.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CategoryTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          <p className="text-sm text-red-600">High Risk: {data.highRisk}</p>
          <p className="text-sm text-green-600">Low Risk: {data.lowRisk}</p>
          <p className="text-sm text-gray-600">Risk Rate: {data.riskPercentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Food Colorant Risk Analysis</h1>
          <p className="text-gray-600">Comprehensive analysis of artificial colorants in food products</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-800">70</p>
              </div>
              <Package className="h-12 w-12 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High-Risk Products</p>
                <p className="text-3xl font-bold text-red-600">45</p>
                <p className="text-sm text-gray-500">64% of total</p>
              </div>
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low-Risk Products</p>
                <p className="text-3xl font-bold text-green-600">25</p>
                <p className="text-sm text-gray-500">36% of total</p>
              </div>
              <Shield className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Most Common</p>
                <p className="text-lg font-bold text-orange-600">Sunset Yellow</p>
                <p className="text-sm text-gray-500">E110 - 18 products</p>
              </div>
              <TrendingUp className="h-12 w-12 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Risk Distribution Pie Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Risk Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Hazardous Colorants */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Hazardous Colorants</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={colorantsData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="code" type="category" width={60} />
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value} products`,
                    props.payload.name
                  ]}
                />
                <Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category-wise Analysis */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Category-wise Risk Analysis</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip content={<CategoryTooltip />} />
              <Legend />
              <Bar dataKey="highRisk" stackId="a" fill="#ef4444" name="High Risk" />
              <Bar dataKey="lowRisk" stackId="a" fill="#22c55e" name="Low Risk" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Colorants Table */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Colorant Analysis</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Colorant</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Code</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Products</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Percentage</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {colorantsData.map((colorant, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {colorant.name.split('(')[0].trim()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">
                        {colorant.code}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{colorant.count}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {Math.round((colorant.count / 70) * 100)}%
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                        High
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-8">
          Analysis based on 70 food products • Data current as of June 2025
        </div>
      </div>
    </div>
  );
};

export default Dashboard;