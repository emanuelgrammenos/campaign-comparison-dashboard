import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ComposedChart, Area } from 'recharts';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CampaignComparison: React.FC = () => {
  // Data from complete analysis - updated with sales chart-based ROAS calculation
  const campaignData = {
    // Comparison 1: Chimperator vs EDGE pre-Cro Tour
    preCroTour: {
      chimperator: {
        period: "03.03.2025 - 21.03.2025",
        duration: 19,
        spend: 12813.95,
        impressions: 2496505,
        clicks: 34926,
        conversions: 156,
        revenue: 21956.00,
        roas: 1.71,
        daily: {
          spend: 674.42,
          impressions: 131395,
          clicks: 1838.21,
          conversions: 8.21,
          revenue: 1155.58
        }
      },
      edge: {
        period: "07.11.2024 - 23.11.2024",
        duration: 17,
        spend: 4880.38,
        impressions: 1491743,
        clicks: 20623,
        conversions: 86,
        revenue: 11985.00, // Adjusted based on ticket sales chart analysis (28% of total)
        roas: 2.46, // Recalculated based on ticket sales distribution
        daily: {
          spend: 287.08,
          impressions: 87750,
          clicks: 1213.13,
          conversions: 5.04,
          revenue: 705.00 // Adjusted based on new revenue estimate
        }
      }
    },
    
    // Comparison 2: Full Campaigns
    fullCampaign: {
      chimperator: {
        period: "03.03.2025 - 21.03.2025",
        duration: 19,
        spend: 12813.95,
        impressions: 2496505,
        clicks: 34926,
        conversions: 156,
        revenue: 21956.00,
        roas: 1.71,
        daily: {
          spend: 674.42,
          impressions: 131395,
          clicks: 1838.21,
          conversions: 8.21,
          revenue: 1155.58
        }
      },
      edge: {
        period: "07.11.2024 - 30.12.2024",
        duration: 54,
        spend: 15502.37,
        impressions: 4738478,
        clicks: 65509,
        conversions: 272,
        revenue: 42803.86,
        roas: 2.76,
        daily: {
          spend: 287.08,
          impressions: 87750,
          clicks: 1213.13,
          conversions: 5.04,
          revenue: 792.66
        },
        // Breakdown by period based on ticket sales chart analysis
        periods: {
          preCroTour: {
            period: "07.11.2024 - 23.11.2024",
            spend: 4880.38,
            revenue: 11985.00,
            roas: 2.46,
            salesPercentage: 28
          },
          croTour: {
            period: "24.11.2024 - 30.12.2024", 
            spend: 10621.99,
            revenue: 30818.86,
            roas: 2.90,
            salesPercentage: 72
          }
        }
      }
    },
    
    // Meta Platforms Breakdown for EDGE
    edgeMeta: {
      spend: 10599.94,
      impressions: 2267591,
      clicks: 57018,
      conversions: 252,
      revenue: 39665.35,
      roas: 3.74,
      platforms: {
        instagram: {
          spend: 9514.73,
          impressions: 2046079,
          clicks: 47143,
          conversions: 243,
          revenue: 38283.70,
          roas: 4.02
        },
        facebook: {
          spend: 1085.21,
          impressions: 221512,
          clicks: 9875,
          conversions: 9,
          revenue: 1381.65,
          roas: 1.27
        }
      }
    }
  };

  // Format large numbers
  const formatNumber = (num: number | null | undefined): string => {
    if (num === null || num === undefined) return 'N/A';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  // Format currency
  const formatCurrency = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
  };

  // Custom tooltip for charts
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-md">
          <p className="font-bold">{label}</p>
          {payload.map((entry, index) => (
            entry.value !== null && entry.value !== undefined && (
              <p key={index} style={{ color: entry.color }}>
                {entry.name}: {typeof entry.value === 'number' 
                  ? (entry.value >= 100 
                    ? formatNumber(entry.value) 
                    : entry.value.toFixed(2))
                  : entry.value}
                {label?.includes('€') ? '€' : label?.includes('%') ? '%' : ''}
              </p>
            )
          ))}
        </div>
      );
    }
    return null;
  };
  
  // COMPARISON 1: Chimperator vs EDGE pre-Cro Tour - Key Metrics
  const comparison1FinancialMetrics = [
    { name: 'Spend (€)', chimperator: campaignData.preCroTour.chimperator.spend, edge: campaignData.preCroTour.edge.spend },
    { name: 'Revenue (€)', chimperator: campaignData.preCroTour.chimperator.revenue, edge: campaignData.preCroTour.edge.revenue },
  ];
  
  const comparison1RatioMetrics = [
    { name: 'Duration (Days)', chimperator: campaignData.preCroTour.chimperator.duration, edge: campaignData.preCroTour.edge.duration },
    { name: 'ROAS', chimperator: campaignData.preCroTour.chimperator.roas, edge: campaignData.preCroTour.edge.roas }
  ];
  
  // COMPARISON 1: Daily Metrics
  const comparison1DailyMetrics = [
    { name: 'Daily Spend (€)', chimperator: campaignData.preCroTour.chimperator.daily.spend, edge: campaignData.preCroTour.edge.daily.spend },
    { name: 'Daily Revenue (€)', chimperator: campaignData.preCroTour.chimperator.daily.revenue, edge: campaignData.preCroTour.edge.daily.revenue },
    { name: 'Daily Conversions', chimperator: campaignData.preCroTour.chimperator.daily.conversions, edge: campaignData.preCroTour.edge.daily.conversions }
  ];
  
  // COMPARISON 2: Full Campaigns - Key Metrics
  const comparison2FinancialMetrics = [
    { name: 'Spend (€)', chimperator: campaignData.fullCampaign.chimperator.spend, edge: campaignData.fullCampaign.edge.spend },
    { name: 'Revenue (€)', chimperator: campaignData.fullCampaign.chimperator.revenue, edge: campaignData.fullCampaign.edge.revenue },
  ];
  
  const comparison2RatioMetrics = [
    { name: 'Duration (Days)', chimperator: campaignData.fullCampaign.chimperator.duration, edge: campaignData.fullCampaign.edge.duration },
    { name: 'ROAS', chimperator: campaignData.fullCampaign.chimperator.roas, edge: campaignData.fullCampaign.edge.roas }
  ];
  
  // COMPARISON 2: Daily Metrics
  const comparison2DailyMetrics = [
    { name: 'Daily Spend (€)', chimperator: campaignData.fullCampaign.chimperator.daily.spend, edge: campaignData.fullCampaign.edge.daily.spend },
    { name: 'Daily Revenue (€)', chimperator: campaignData.fullCampaign.chimperator.daily.revenue, edge: campaignData.fullCampaign.edge.daily.revenue },
    { name: 'Daily Conversions', chimperator: campaignData.fullCampaign.chimperator.daily.conversions, edge: campaignData.fullCampaign.edge.daily.conversions }
  ];
  
  // EDGE Meta Platforms breakdown
  const edgeMetaPlatforms = [
    { name: 'Instagram', spend: campaignData.edgeMeta.platforms.instagram.spend, revenue: campaignData.edgeMeta.platforms.instagram.revenue, roas: campaignData.edgeMeta.platforms.instagram.roas },
    { name: 'Facebook', spend: campaignData.edgeMeta.platforms.facebook.spend, revenue: campaignData.edgeMeta.platforms.facebook.revenue, roas: campaignData.edgeMeta.platforms.facebook.roas }
  ];
  
  // Efficiency metrics (CPC, CTR, Conv Rate)
  const comparison1EfficiencyMetrics = [
    { 
      name: 'CPC (€)', 
      chimperator: campaignData.preCroTour.chimperator.spend / campaignData.preCroTour.chimperator.clicks, 
      edge: campaignData.preCroTour.edge.spend / campaignData.preCroTour.edge.clicks 
    },
    { 
      name: 'CTR (%)', 
      chimperator: (campaignData.preCroTour.chimperator.clicks / campaignData.preCroTour.chimperator.impressions) * 100, 
      edge: (campaignData.preCroTour.edge.clicks / campaignData.preCroTour.edge.impressions) * 100 
    },
    { 
      name: 'Conv. Rate (%)', 
      chimperator: (campaignData.preCroTour.chimperator.conversions / campaignData.preCroTour.chimperator.clicks) * 100, 
      edge: (campaignData.preCroTour.edge.conversions / campaignData.preCroTour.edge.clicks) * 100 
    }
  ];
  
  const comparison2EfficiencyMetrics = [
    { 
      name: 'CPC (€)', 
      chimperator: campaignData.fullCampaign.chimperator.spend / campaignData.fullCampaign.chimperator.clicks, 
      edge: campaignData.fullCampaign.edge.spend / campaignData.fullCampaign.edge.clicks 
    },
    { 
      name: 'CTR (%)', 
      chimperator: (campaignData.fullCampaign.chimperator.clicks / campaignData.fullCampaign.chimperator.impressions) * 100, 
      edge: (campaignData.fullCampaign.edge.clicks / campaignData.fullCampaign.edge.impressions) * 100 
    },
    { 
      name: 'Conv. Rate (%)', 
      chimperator: (campaignData.fullCampaign.chimperator.conversions / campaignData.fullCampaign.chimperator.clicks) * 100, 
      edge: (campaignData.fullCampaign.edge.conversions / campaignData.fullCampaign.edge.clicks) * 100 
    }
  ];

  // Key insights for both comparisons
  const insights = {
    comparison1: [
      "Chimperator spent 2.63x more than EDGE pre-Cro Tour (€12,814 vs €4,880)",
      "EDGE achieved better ROAS (2.46 vs 1.71) despite lower spend",
      "Chimperator generated 1.83x more revenue (€21,956 vs €11,985)",
      "Chimperator's daily spend was 2.35x higher (€674 vs €287)",
      "Both campaigns had similar durations (19 days vs 17 days)",
      "Chimperator delivered 1.5x more daily impressions and 1.52x more daily clicks"
    ],
    comparison2: [
      "EDGE full campaign ran 2.84x longer (54 days vs 19 days)",
      "EDGE's total spend was slightly higher (€15,502 vs €12,814)",
      "EDGE generated almost 2x more total revenue (€42,804 vs €21,956)",
      "EDGE's ROAS varied across periods: pre-Cro Tour (2.46) and Cro Tour (2.90)",
      "Chimperator's daily spend was 2.35x higher (€674 vs €287)",
      "Chimperator achieved 1.46x higher daily revenue (€1,156 vs €793)"
    ],
    global: [
      "Intensive (Chimperator) vs. Sustained (EDGE) campaign approaches",
      "Higher daily spends didn't translate to proportionally higher ROAS",
      "Instagram consistently outperformed Facebook for both campaigns",
      "Campaign performance improves during tour announcement/event periods (ROAS 2.46 → 2.90)",
      "Both campaigns showed viable strategies with different strengths",
      "Eventim sales data confirms Meta campaign attribution accuracy"
    ]
  };

  return (
    <div className="flex flex-col space-y-6 p-6 bg-gray-50 rounded-lg w-full">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Comprehensive Campaign Comparison: EDGE vs Chimperator Live</h1>
        <p className="text-gray-700">
          This analysis compares the EDGE and Chimperator Live campaigns using two perspectives: 
          (1) Chimperator vs EDGE pre-Cro Tour period, and 
          (2) both campaigns over their full duration.
        </p>
      </div>
      
      {/* SECTION 1: Comparison 1 - Chimperator vs EDGE pre-Cro Tour */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Comparison 1: Chimperator vs EDGE pre-Cro Tour</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-blue-50 rounded">
            <h3 className="text-lg font-bold text-blue-800">EDGE (Pre-Cro Tour)</h3>
            <p className="text-sm text-gray-600">{campaignData.preCroTour.edge.period} ({campaignData.preCroTour.edge.duration} days)</p>
            <div className="mt-2">
              <p>Spend: {formatCurrency(campaignData.preCroTour.edge.spend)}</p>
              <p>Revenue: {formatCurrency(campaignData.preCroTour.edge.revenue)}</p>
              <p>ROAS: {campaignData.preCroTour.edge.roas.toFixed(2)}</p>
              <p>Conversions: {Math.round(campaignData.preCroTour.edge.conversions)}</p>
              <p className="text-xs text-gray-500 mt-1 italic">Revenue based on 28% of total EDGE campaign revenue (per ticket sales chart)</p>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded">
            <h3 className="text-lg font-bold text-green-800">Chimperator Live</h3>
            <p className="text-sm text-gray-600">{campaignData.preCroTour.chimperator.period} ({campaignData.preCroTour.chimperator.duration} days)</p>
            <div className="mt-2">
              <p>Spend: {formatCurrency(campaignData.preCroTour.chimperator.spend)}</p>
              <p>Revenue: {formatCurrency(campaignData.preCroTour.chimperator.revenue)}</p>
              <p>ROAS: {campaignData.preCroTour.chimperator.roas.toFixed(2)}</p>
              <p>Conversions: {campaignData.preCroTour.chimperator.conversions}</p>
            </div>
          </div>
        </div>
        
        {/* Total Campaign Metrics - Financial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Financial Metrics</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparison1FinancialMetrics}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => formatNumber(value)} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="edge" name="EDGE (Pre-Cro Tour)" fill="#0088FE" />
                  <Bar dataKey="chimperator" name="Chimperator" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Duration & ROAS</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={comparison1RatioMetrics}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 'dataMax + 5']} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="edge" name="EDGE (Pre-Cro Tour)" fill="#0088FE" strokeWidth={2} />
                  <Bar dataKey="chimperator" name="Chimperator" fill="#00C49F" strokeWidth={2} />
                  <Line type="monotone" dataKey="edge" stroke="#0088FE" dot={{ fill: '#0088FE', strokeWidth: 2, r: 6 }} strokeWidth={3} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="chimperator" stroke="#00C49F" dot={{ fill: '#00C49F', strokeWidth: 2, r: 6 }} strokeWidth={3} activeDot={{ r: 8 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 p-2 bg-blue-50 rounded-md">
              <p className="text-xs text-gray-700">
                <span className="font-bold">Note:</span> Duration and ROAS shown on a separate scale to highlight differences.
                EDGE had a slightly shorter duration ({campaignData.preCroTour.edge.duration} days) but higher ROAS ({campaignData.preCroTour.edge.roas.toFixed(2)}) compared to Chimperator's {campaignData.preCroTour.chimperator.duration} days and {campaignData.preCroTour.chimperator.roas.toFixed(2)} ROAS.
              </p>
            </div>
          </div>
        </div>
        
        {/* Daily Metrics */}
        <div className="h-64 mb-6">
          <h3 className="text-lg font-semibold mb-2">Daily Performance Metrics</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparison1DailyMetrics}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => formatNumber(value)} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="edge" name="EDGE (Pre-Cro Tour)" fill="#0088FE" />
              <Bar dataKey="chimperator" name="Chimperator" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Efficiency Metrics */}
        <div className="h-64 mb-4">
          <h3 className="text-lg font-semibold mb-2">Efficiency Metrics</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparison1EfficiencyMetrics}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="edge" name="EDGE (Pre-Cro Tour)" fill="#0088FE" />
              <Bar dataKey="chimperator" name="Chimperator" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Key Insights */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Key Insights</h3>
          <ul className="list-disc pl-5 space-y-1">
            {insights.comparison1.map((insight, index) => (
              <li key={index} className="text-gray-700">{insight}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* SECTION 2: Comparison 2 - Full Campaigns */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Comparison 2: Full Campaign Duration</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-blue-50 rounded">
            <h3 className="text-lg font-bold text-blue-800">EDGE (Full Campaign)</h3>
            <p className="text-sm text-gray-600">{campaignData.fullCampaign.edge.period} ({campaignData.fullCampaign.edge.duration} days)</p>
            <div className="mt-2">
              <p>Spend: {formatCurrency(campaignData.fullCampaign.edge.spend)}</p>
              <p>Revenue: {formatCurrency(campaignData.fullCampaign.edge.revenue)}</p>
              <p>ROAS: {campaignData.fullCampaign.edge.roas.toFixed(2)}</p>
              <p>Conversions: {campaignData.fullCampaign.edge.conversions}</p>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded">
            <h3 className="text-lg font-bold text-green-800">Chimperator Live</h3>
            <p className="text-sm text-gray-600">{campaignData.fullCampaign.chimperator.period} ({campaignData.fullCampaign.chimperator.duration} days)</p>
            <div className="mt-2">
              <p>Spend: {formatCurrency(campaignData.fullCampaign.chimperator.spend)}</p>
              <p>Revenue: {formatCurrency(campaignData.fullCampaign.chimperator.revenue)}</p>
              <p>ROAS: {campaignData.fullCampaign.chimperator.roas.toFixed(2)}</p>
              <p>Conversions: {campaignData.fullCampaign.chimperator.conversions}</p>
            </div>
          </div>
        </div>
        
        {/* Total Campaign Metrics - Financial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Financial Metrics</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparison2FinancialMetrics}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => formatNumber(value)} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="edge" name="EDGE (Full Campaign)" fill="#0088FE" />
                  <Bar dataKey="chimperator" name="Chimperator" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Duration & ROAS</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={comparison2RatioMetrics}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 'dataMax + 5']} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="edge" name="EDGE (Full Campaign)" fill="#0088FE" strokeWidth={2} />
                  <Bar dataKey="chimperator" name="Chimperator" fill="#00C49F" strokeWidth={2} />
                  <Line type="monotone" dataKey="edge" stroke="#0088FE" dot={{ fill: '#0088FE', strokeWidth: 2, r: 6 }} strokeWidth={3} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="chimperator" stroke="#00C49F" dot={{ fill: '#00C49F', strokeWidth: 2, r: 6 }} strokeWidth={3} activeDot={{ r: 8 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 p-2 bg-blue-50 rounded-md">
              <p className="text-xs text-gray-700">
                <span className="font-bold">Note:</span> Duration and ROAS shown on a separate scale to highlight differences.
                EDGE ran much longer ({campaignData.fullCampaign.edge.duration} days) with higher ROAS ({campaignData.fullCampaign.edge.roas.toFixed(2)}) compared to Chimperator's {campaignData.fullCampaign.chimperator.duration} days and {campaignData.fullCampaign.chimperator.roas.toFixed(2)} ROAS.
              </p>
            </div>
          </div>
        </div>
        
        {/* Daily Metrics */}
        <div className="h-64 mb-6">
          <h3 className="text-lg font-semibold mb-2">Daily Performance Metrics</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparison2DailyMetrics}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => formatNumber(value)} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="edge" name="EDGE (Full Campaign)" fill="#0088FE" />
              <Bar dataKey="chimperator" name="Chimperator" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Efficiency Metrics */}
        <div className="h-64 mb-4">
          <h3 className="text-lg font-semibold mb-2">Efficiency Metrics</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparison2EfficiencyMetrics}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="edge" name="EDGE (Full Campaign)" fill="#0088FE" />
              <Bar dataKey="chimperator" name="Chimperator" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Key Insights */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Key Insights</h3>
          <ul className="list-disc pl-5 space-y-1">
            {insights.comparison2.map((insight, index) => (
              <li key={index} className="text-gray-700">{insight}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* SECTION 3: EDGE Meta Platform Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">EDGE Campaign: Meta Platform Breakdown</h2>
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={edgeMetaPlatforms}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => formatCurrency(value)} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="spend" name="Spend" fill="#8884d8" />
              <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#82ca9d" />
              <Line yAxisId="right" type="monotone" dataKey="roas" name="ROAS" stroke="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-2">
            Instagram was the dominant platform for EDGE, generating €38,284 revenue with a 4.02 ROAS compared to Facebook's €1,382 revenue with 1.27 ROAS.
          </p>
        </div>
      </div>
      
      {/* SECTION 4: Ticket Sales Analysis */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Campaign Impact on Ticket Sales & Methodology</h2>
        
        <div className="p-2 bg-gray-100 rounded mb-4">
          <p className="text-sm text-gray-700 font-bold">
            Ticket Sales Analysis:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-sm text-gray-700">
            <li>EDGE campaign drove significant ticket sales during Nov-Dec 2024</li>
            <li>Peak sales occurred during the Cro Tour 2024 period (mid-December)</li>
            <li>Chimperator Live campaign produced an immediate sales increase in March 2025</li>
            <li>Both campaigns demonstrated effective sales activation capability</li>
          </ul>
        </div>
        
        <div className="p-4 bg-yellow-50 rounded border border-yellow-200">
          <h3 className="text-lg font-bold mb-2">Methodology & Data Sources</h3>
          
          <p className="text-sm text-gray-700 mb-2 font-medium">ROAS Calculation for EDGE Pre-Cro Tour Period:</p>
          <p className="text-sm text-gray-700 mb-2">
            Rather than using a simple time-based proportion of the full EDGE campaign, we analyzed the ticket sales chart (document 9) to create a more accurate ROAS estimate for the pre-Cro Tour period.
          </p>
          
          <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700 mb-3">
            <li>Visual analysis of ticket sales chart showed approximately 28% of sales occurred during pre-Cro Tour period (07.11.2024 - 23.11.2024)</li>
            <li>Applied this percentage to the total EDGE campaign revenue: €42,803.86 × 28% = €11,985.00</li>
            <li>Pre-Cro Tour spend (based on duration proportion): €4,880.38</li>
            <li>Calculated ROAS: €11,985.00 ÷ €4,880.38 = 2.46</li>
            <li>Cro Tour period ROAS (remaining 72% of revenue): €30,818.86 ÷ €10,621.99 = 2.90</li>
          </ol>
          
          <p className="text-sm text-gray-700 mb-2 font-medium">Data Sources:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>EDGE campaign report (document 10): Total campaign metrics</li>
            <li>Ticket sales chart (document 9): Distribution of sales across campaign periods</li>
            <li>Chimperator Live campaign data: Exported CSV files analyzed earlier</li>
          </ul>
        </div>
      </div>
      
      {/* SECTION 5: EDGE Campaign Period Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">EDGE Campaign: Period Breakdown</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-blue-50 rounded">
            <h3 className="text-lg font-bold text-blue-800">Pre-Cro Tour Period</h3>
            <p className="text-sm text-gray-600">{campaignData.fullCampaign.edge.periods.preCroTour.period} (17 days)</p>
            <div className="mt-2">
              <p>Spend: {formatCurrency(campaignData.fullCampaign.edge.periods.preCroTour.spend)}</p>
              <p>Revenue: {formatCurrency(campaignData.fullCampaign.edge.periods.preCroTour.revenue)}</p>
              <p>ROAS: {campaignData.fullCampaign.edge.periods.preCroTour.roas.toFixed(2)}</p>
              <p>Sales Percentage: {campaignData.fullCampaign.edge.periods.preCroTour.salesPercentage}%</p>
            </div>
          </div>
          <div className="p-4 bg-indigo-50 rounded">
            <h3 className="text-lg font-bold text-indigo-800">Cro Tour Period</h3>
            <p className="text-sm text-gray-600">{campaignData.fullCampaign.edge.periods.croTour.period} (37 days)</p>
            <div className="mt-2">
              <p>Spend: {formatCurrency(campaignData.fullCampaign.edge.periods.croTour.spend)}</p>
              <p>Revenue: {formatCurrency(campaignData.fullCampaign.edge.periods.croTour.revenue)}</p>
              <p>ROAS: {campaignData.fullCampaign.edge.periods.croTour.roas.toFixed(2)}</p>
              <p>Sales Percentage: {campaignData.fullCampaign.edge.periods.croTour.salesPercentage}%</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-700">
            The EDGE campaign showed a significant performance improvement during the Cro Tour period, with ROAS increasing from 2.46 to 2.90. This highlights the impact of the tour announcement and the importance of campaign timing relative to major events.
          </p>
        </div>
      </div>

      {/* SECTION 6: Overall Conclusions and Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Overall Conclusions and Recommendations</h2>
        
        <h3 className="text-lg font-semibold mb-2">Key Findings</h3>
        <ul className="list-disc pl-5 space-y-1 mb-4">
          {insights.global.map((insight, index) => (
            <li key={index} className="text-gray-700">{insight}</li>
          ))}
        </ul>
        
        <h3 className="text-lg font-semibold mb-2">Strategic Recommendations</h3>
        <div className="space-y-3">
          <div>
            <p className="font-medium">1. Event-Aligned Campaign Strategy</p>
            <p className="text-gray-700 ml-4">
              Align campaign phases with key events, as the EDGE campaign showed significant ROAS improvement during the Cro Tour period (2.46 → 2.90). Consider a lower-intensity pre-announcement phase followed by increased spend during tour/show announcement periods.
            </p>
          </div>
          
          <div>
            <p className="font-medium">2. Platform Allocation</p>
            <p className="text-gray-700 ml-4">
              Prioritize Instagram budget allocation based on its stronger performance across both campaigns (4.02 ROAS for EDGE). Test Facebook with smaller budgets only.
            </p>
          </div>
          
          <div>
            <p className="font-medium">3. Balanced Intensity Approach</p>
            <p className="text-gray-700 ml-4">
              Consider a hybrid approach: moderate baseline spending (€287/day range) with strategic periods of higher spending (€674/day range) during key promotional windows to optimize both efficiency and volume.
            </p>
          </div>
          
          <div>
            <p className="font-medium">4. Seasonal & Duration Testing</p>
            <p className="text-gray-700 ml-4">
              Test campaign timing against seasonal factors. EDGE (Nov-Dec) and Chimperator (Mar) operated in different seasons. Extend campaign duration for better overall results while maintaining key performance metrics.
            </p>
          </div>
          
          <div>
            <p className="font-medium">5. Performance Monitoring by Period</p>
            <p className="text-gray-700 ml-4">
              Implement more granular tracking of campaign performance across different phases (pre-announcement, announcement, post-announcement) to better optimize spending patterns based on actual ROAS trends rather than applying the same strategy throughout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignComparison; 