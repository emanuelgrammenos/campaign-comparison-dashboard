import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const CampaignComparison = () => {
  // Campaign data from analysis
  const campaignData = {
    edge: {
      period: "07.11.2024 - 20.11.2024",
      platforms: ["Facebook", "Instagram"],
      spend: 1948.41,
      impressions: 442954,
      clicks: 14141,
      cpc: 0.14,
      ctr: 3.19,
      conversions: 56,
      conversionRate: 0.40,
      revenue: 8565.32,
      roas: 4.40,
      metaPixelRevenue: 81556.35,
      metaPixelROAS: 18.18,
      engagement: {
        postInteractions: 341505,
        videoThruPlays: 63977
      }
    },
    chimperator: {
      period: "03.03.2025 - 21.03.2025",
      platforms: ["Facebook", "Instagram"],
      spend: 12813.95, // Combined data from all 5 flights
      impressions: 2496505,
      clicks: 34926,
      cpc: 0.37,
      ctr: 1.40,
      conversions: 156,
      conversionRate: 0.45,
      revenue: 21956.00,
      roas: 1.71
    }
  };

  // Prepare comparison data for charts
  const comparisonMetrics = [
    { name: 'Spend (€)', edge: campaignData.edge.spend, chimperator: campaignData.chimperator.spend },
    { name: 'Revenue (€)', edge: campaignData.edge.revenue, chimperator: campaignData.chimperator.revenue },
    { name: 'ROAS', edge: campaignData.edge.roas, chimperator: campaignData.chimperator.roas },
    { name: 'Conversions', edge: campaignData.edge.conversions, chimperator: campaignData.chimperator.conversions },
  ];

  const performanceMetrics = [
    { name: 'CTR (%)', edge: campaignData.edge.ctr, chimperator: campaignData.chimperator.ctr },
    { name: 'Conv. Rate (%)', edge: campaignData.edge.conversionRate, chimperator: campaignData.chimperator.conversionRate },
    { name: 'CPC (€)', edge: campaignData.edge.cpc, chimperator: campaignData.chimperator.cpc },
  ];

  const volumeMetrics = [
    { name: 'Impressions', edge: campaignData.edge.impressions, chimperator: campaignData.chimperator.impressions },
    { name: 'Clicks', edge: campaignData.edge.clicks, chimperator: campaignData.chimperator.clicks },
  ];

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
  };

  // Create attribution comparison data
  const attributionData = [
    { name: 'Last Click', value: campaignData.edge.revenue },
    { name: 'Meta Pixel', value: campaignData.edge.metaPixelRevenue - campaignData.edge.revenue }
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-md">
          <p className="font-bold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value >= 100 ? formatNumber(entry.value) : entry.value.toFixed(2)}
              {label.includes('€') ? '€' : label.includes('%') ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Insights based on the data
  const insights = [
    "EDGE campaign had higher ROAS (4.40 vs 1.71) despite lower overall spend",
    "Chimperator had higher CPC (0.37€ vs 0.14€) but similar conversion rate (0.45% vs 0.40%)",
    "EDGE campaign had better CTR (3.19% vs 1.40%)",
    "Chimperator generated more total revenue (€21,956 vs €8,565) with higher spend",
    "Chimperator delivered higher total conversions (156 vs 56) with ~6.5x spend",
    "Meta Pixel attribution shows significant view-through conversions for EDGE"
  ];

  return (
    <div className="flex flex-col space-y-6 p-6 bg-gray-50 rounded-lg w-full">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">META Campaigns Comparison: EDGE vs Chimperator Live</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded">
            <h2 className="text-lg font-bold text-blue-800">EDGE Campaign</h2>
            <p className="text-sm text-gray-600">{campaignData.edge.period}</p>
            <div className="mt-2">
              <p>Spend: {formatCurrency(campaignData.edge.spend)}</p>
              <p>Revenue: {formatCurrency(campaignData.edge.revenue)}</p>
              <p>ROAS: {campaignData.edge.roas.toFixed(2)}</p>
              <p>Conversions: {campaignData.edge.conversions}</p>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded">
            <h2 className="text-lg font-bold text-green-800">Chimperator Live Campaign</h2>
            <p className="text-sm text-gray-600">{campaignData.chimperator.period}</p>
            <div className="mt-2">
              <p>Spend: {formatCurrency(campaignData.chimperator.spend)}</p>
              <p>Revenue: {formatCurrency(campaignData.chimperator.revenue)}</p>
              <p>ROAS: {campaignData.chimperator.roas.toFixed(2)}</p>
              <p>Conversions: {campaignData.chimperator.conversions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main KPIs Comparison */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Key Performance Metrics</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonMetrics}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(1)}K` : value} />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="edge" name="EDGE" fill="#0088FE" />
              <Bar yAxisId="left" dataKey="chimperator" name="Chimperator" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Ratios */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Performance Ratios</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={performanceMetrics}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="edge" name="EDGE" fill="#0088FE" />
              <Bar dataKey="chimperator" name="Chimperator" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Volume Metrics */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Volume Metrics</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={volumeMetrics}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => formatNumber(value)} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="edge" name="EDGE" fill="#0088FE" />
              <Bar dataKey="chimperator" name="Chimperator" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Attribution Comparison (EDGE only) */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">EDGE Campaign: Meta Pixel vs Last-Click Attribution</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {attributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <p className="font-bold">Last-Click Revenue: {formatCurrency(campaignData.edge.revenue)}</p>
              <p className="font-bold">Meta Pixel Revenue: {formatCurrency(campaignData.edge.metaPixelRevenue)}</p>
              <p className="font-bold">Difference: {formatCurrency(campaignData.edge.metaPixelRevenue - campaignData.edge.revenue)}</p>
            </div>
            <p className="text-gray-600">
              Meta Pixel attributes view-through conversions where users saw but didn't click ads before converting.
            </p>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Key Insights</h2>
        <ul className="list-disc pl-6 space-y-2">
          {insights.map((insight, index) => (
            <li key={index} className="text-gray-800">{insight}</li>
          ))}
        </ul>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recommendations</h2>
        <div className="space-y-3">
          <p className="font-medium">1. Efficiency Improvement</p>
          <p className="text-gray-700 mb-2">
            Chimperator campaign has higher CPC (0.37€ vs 0.14€) and lower CTR. Apply EDGE campaign's creative and targeting approach to improve efficiency.
          </p>

          <p className="font-medium">2. Flight Performance Analysis</p>
          <p className="text-gray-700 mb-2">
            Review individual flight performance data to identify which targeting strategies delivered the best ROAS across Chimperator's 5 flights.
          </p>

          <p className="font-medium">3. Scale High-ROAS Tactics</p>
          <p className="text-gray-700 mb-2">
            The EDGE campaign achieved 2.5x higher ROAS (4.40 vs 1.71). Study its ad copy, creative approach, and audience targeting for implementation in future campaigns.
          </p>

          <p className="font-medium">4. Budget Optimization</p>
          <p className="text-gray-700 mb-2">
            Test lower overall budgets with more focused targeting to potentially achieve higher ROAS as demonstrated by the EDGE campaign.
          </p>

          <p className="font-medium">5. Attribution Model Review</p>
          <p className="text-gray-700">
            Implement view-through attribution tracking for Chimperator campaign to assess full campaign impact beyond last-click metrics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignComparison;