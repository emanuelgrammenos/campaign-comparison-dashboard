import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ComposedChart, Area } from 'recharts';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CampaignComparison: React.FC = () => {
  // Daten aus der vollständigen Analyse - aktualisiert mit verkaufsbasierter ROAS-Berechnung
  const campaignData = {
    // Vergleich 1: Chimperator vs EDGE vor der Cro Tour
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
    
    // Vergleich 2: Gesamtkampagnen
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
    
    // Meta-Plattformen Aufschlüsselung für EDGE
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

  // Formatierung großer Zahlen
  const formatNumber = (num: number | null | undefined): string => {
    if (num === null || num === undefined) return 'K.A.';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + ' Mio.';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + ' Tsd.';
    }
    return num.toLocaleString('de-DE');
  };

  // Währungsformatierung
  const formatCurrency = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return 'K.A.';
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
  };

  // Benutzerdefinierter Tooltip für Diagramme
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
  
  // VERGLEICH 1: Chimperator vs EDGE vor Cro Tour - Hauptkennzahlen
  const comparison1FinancialMetrics = [
    { name: 'Ausgaben (€)', chimperator: campaignData.preCroTour.chimperator.spend, edge: campaignData.preCroTour.edge.spend },
    { name: 'Umsatz (€)', chimperator: campaignData.preCroTour.chimperator.revenue, edge: campaignData.preCroTour.edge.revenue },
  ];
  
  const comparison1RatioMetrics = [
    { name: 'Laufzeit (Tage)', chimperator: campaignData.preCroTour.chimperator.duration, edge: campaignData.preCroTour.edge.duration },
    { name: 'Return on Ad Spend', chimperator: campaignData.preCroTour.chimperator.roas, edge: campaignData.preCroTour.edge.roas }
  ];
  
  // VERGLEICH 1: Tägliche Kennzahlen
  const comparison1DailyMetrics = [
    { name: 'Tägliche Ausgaben (€)', chimperator: campaignData.preCroTour.chimperator.daily.spend, edge: campaignData.preCroTour.edge.daily.spend },
    { name: 'Täglicher Umsatz (€)', chimperator: campaignData.preCroTour.chimperator.daily.revenue, edge: campaignData.preCroTour.edge.daily.revenue },
    { name: 'Tägliche Conversions', chimperator: campaignData.preCroTour.chimperator.daily.conversions, edge: campaignData.preCroTour.edge.daily.conversions }
  ];
  
  // VERGLEICH 2: Gesamtkampagnen - Hauptkennzahlen
  const comparison2FinancialMetrics = [
    { name: 'Ausgaben (€)', chimperator: campaignData.fullCampaign.chimperator.spend, edge: campaignData.fullCampaign.edge.spend },
    { name: 'Umsatz (€)', chimperator: campaignData.fullCampaign.chimperator.revenue, edge: campaignData.fullCampaign.edge.revenue },
  ];
  
  const comparison2RatioMetrics = [
    { name: 'Laufzeit (Tage)', chimperator: campaignData.fullCampaign.chimperator.duration, edge: campaignData.fullCampaign.edge.duration },
    { name: 'Return on Ad Spend', chimperator: campaignData.fullCampaign.chimperator.roas, edge: campaignData.fullCampaign.edge.roas }
  ];
  
  // VERGLEICH 2: Tägliche Kennzahlen
  const comparison2DailyMetrics = [
    { name: 'Tägliche Ausgaben (€)', chimperator: campaignData.fullCampaign.chimperator.daily.spend, edge: campaignData.fullCampaign.edge.daily.spend },
    { name: 'Täglicher Umsatz (€)', chimperator: campaignData.fullCampaign.chimperator.daily.revenue, edge: campaignData.fullCampaign.edge.daily.revenue },
    { name: 'Tägliche Conversions', chimperator: campaignData.fullCampaign.chimperator.daily.conversions, edge: campaignData.fullCampaign.edge.daily.conversions }
  ];
  
  // EDGE Meta-Plattformen Aufschlüsselung
  const edgeMetaPlatforms = [
    { name: 'Instagram', spend: campaignData.edgeMeta.platforms.instagram.spend, revenue: campaignData.edgeMeta.platforms.instagram.revenue, roas: campaignData.edgeMeta.platforms.instagram.roas },
    { name: 'Facebook', spend: campaignData.edgeMeta.platforms.facebook.spend, revenue: campaignData.edgeMeta.platforms.facebook.revenue, roas: campaignData.edgeMeta.platforms.facebook.roas }
  ];
  
  // Effizienzkennzahlen (CPC, CTR, Conversion-Rate)
  const comparison1EfficiencyMetrics = [
    { 
      name: 'Kosten pro Klick (€)', 
      chimperator: campaignData.preCroTour.chimperator.spend / campaignData.preCroTour.chimperator.clicks, 
      edge: campaignData.preCroTour.edge.spend / campaignData.preCroTour.edge.clicks 
    },
    { 
      name: 'Klickrate (%)', 
      chimperator: (campaignData.preCroTour.chimperator.clicks / campaignData.preCroTour.chimperator.impressions) * 100, 
      edge: (campaignData.preCroTour.edge.clicks / campaignData.preCroTour.edge.impressions) * 100 
    },
    { 
      name: 'Conversion-Rate (%)', 
      chimperator: (campaignData.preCroTour.chimperator.conversions / campaignData.preCroTour.chimperator.clicks) * 100, 
      edge: (campaignData.preCroTour.edge.conversions / campaignData.preCroTour.edge.clicks) * 100 
    }
  ];
  
  const comparison2EfficiencyMetrics = [
    { 
      name: 'Kosten pro Klick (€)', 
      chimperator: campaignData.fullCampaign.chimperator.spend / campaignData.fullCampaign.chimperator.clicks, 
      edge: campaignData.fullCampaign.edge.spend / campaignData.fullCampaign.edge.clicks 
    },
    { 
      name: 'Klickrate (%)', 
      chimperator: (campaignData.fullCampaign.chimperator.clicks / campaignData.fullCampaign.chimperator.impressions) * 100, 
      edge: (campaignData.fullCampaign.edge.clicks / campaignData.fullCampaign.edge.impressions) * 100 
    },
    { 
      name: 'Conversion-Rate (%)', 
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
    <div className="space-y-8">
      {/* Kampagnenvergleich vor der Cro Tour */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Kampagnenvergleich: Chimperator vs. EDGE (Vor Cro Tour)</h2>
        
        {/* Finanzielle Kennzahlen */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Finanzielle Kennzahlen</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparison1FinancialMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="chimperator" name="Chimperator" fill="#8884d8" />
              <Bar dataKey="edge" name="EDGE" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Verhältniskennzahlen */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Verhältniskennzahlen</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparison1RatioMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="chimperator" name="Chimperator" fill="#8884d8" />
              <Bar dataKey="edge" name="EDGE" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tägliche Kennzahlen */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Tägliche Kennzahlen</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparison1DailyMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="chimperator" name="Chimperator" fill="#8884d8" />
              <Bar dataKey="edge" name="EDGE" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Effizienzkennzahlen */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Effizienzkennzahlen</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparison1EfficiencyMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="chimperator" name="Chimperator" fill="#8884d8" />
              <Bar dataKey="edge" name="EDGE" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gesamtkampagnenvergleich */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Gesamtkampagnenvergleich: Chimperator vs. EDGE</h2>
        
        {/* Finanzielle Kennzahlen */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Finanzielle Kennzahlen</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparison2FinancialMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="chimperator" name="Chimperator" fill="#8884d8" />
              <Bar dataKey="edge" name="EDGE" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Verhältniskennzahlen */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Verhältniskennzahlen</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparison2RatioMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="chimperator" name="Chimperator" fill="#8884d8" />
              <Bar dataKey="edge" name="EDGE" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tägliche Kennzahlen */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Tägliche Kennzahlen</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparison2DailyMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="chimperator" name="Chimperator" fill="#8884d8" />
              <Bar dataKey="edge" name="EDGE" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Effizienzkennzahlen */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Effizienzkennzahlen</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparison2EfficiencyMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="chimperator" name="Chimperator" fill="#8884d8" />
              <Bar dataKey="edge" name="EDGE" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* EDGE Meta-Plattformen Analyse */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">EDGE Meta-Plattformen Analyse</h2>
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={edgeMetaPlatforms}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="spend" name="Ausgaben (€)" fill="#8884d8" />
              <Bar dataKey="revenue" name="Umsatz (€)" fill="#82ca9d" />
              <Bar dataKey="roas" name="Return on Ad Spend" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CampaignComparison; 