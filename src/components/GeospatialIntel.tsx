import { useState, useCallback, useRef } from "react";
import { ConfigProvider, theme, Select } from "antd";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 9.0765, // FCT coordinates
  lng: 7.3986
};

// Mock markers for regions
const regions = [
  { id: 1, name: "Lagos Metro", position: { lat: 6.5244, lng: 3.3792 }, status: "High Activity" },
  { id: 2, name: "FCT Central", position: { lat: 9.0765, lng: 7.3986 }, status: "Medium Activity" },
  { id: 3, name: "Port Harcourt", position: { lat: 4.8156, lng: 7.0498 }, status: "Low Activity" },
  { id: 4, name: "Kano Commercial", position: { lat: 12.0022, lng: 8.5920 }, status: "High Activity" },
];

const GeospatialIntel = () => {
  const [activeTab, setActiveTab] = useState<"territorial" | "buying-power">("territorial");
  const [jurisdiction, setJurisdiction] = useState("All States");
  const [entityGroup, setEntityGroup] = useState("All Companies");
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['visualization' as any]
  });

  const territorialData = [
    { region: "Lagos Metro", activeUsers: "160,000", tgv: "₦1.4 Billion", penetration: "12.5%", color: "text-primary-light" },
    { region: "Ogun Industrial", activeUsers: "140,000", tgv: "₦1.23 Billion", penetration: "9.8%", color: "text-orange-500" },
    { region: "Rivers Port", activeUsers: "125,000", tgv: "₦1.1 Billion", penetration: "11.2%", color: "text-primary-light" },
    { region: "Kano Commercial", activeUsers: "110,000", tgv: "₦975 Million", penetration: "10.5%", color: "text-primary-light" },
    { region: "Oyo Central", activeUsers: "90,000", tgv: "₦800 Million", penetration: "7.5%", color: "text-orange-500" },
  ];

  const buyingPowerData = [
    { region: "Lagos Metro", totalSpend: "₦2.4 Billion", transactions: "47,500", avgOrder: "₦50,526" },
    { region: "Ogun Industrial", totalSpend: "₦2.1 Billion", transactions: "41,000", avgOrder: "₦51,220" },
    { region: "Rivers Port", totalSpend: "₦1.9 Billion", transactions: "38,000", avgOrder: "₦48,718" },
    { region: "Kano Commercial", totalSpend: "₦1.7 Billion", transactions: "34,500", avgOrder: "₦49,275" },
    { region: "Oyo Central", totalSpend: "₦1.4 Billion", transactions: "27,500", avgOrder: "₦50,909" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-white font-heading tracking-tighter text-glow mb-2">
          Geospatial <span className="text-primary-light">Intelligence</span>
        </h2>
        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.25em]">
          Multi-state territorial intelligence and regional buying power analysis
        </p>
      </div>

      <div className="glass-card border-white/5 bg-white/2 rounded-[2.5rem] p-8 md:p-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-white/5 mb-8">
          <button
            onClick={() => setActiveTab("territorial")}
            className={`px-8 py-5 text-[10px] font-black uppercase tracking-widest transition-all relative ${
              activeTab === "territorial" ? "text-primary-light" : "text-white/40 hover:text-white"
            }`}
          >
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Territorial Intelligence</span>
            </div>
            {activeTab === "territorial" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_#00A651]"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("buying-power")}
            className={`px-8 py-5 text-[10px] font-black uppercase tracking-widest transition-all relative ${
              activeTab === "buying-power" ? "text-primary-light" : "text-white/40 hover:text-white"
            }`}
          >
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>Buying Power</span>
            </div>
            {activeTab === "buying-power" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_#00A651]"></div>
            )}
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-6 mb-8">
          <ConfigProvider theme={{ algorithm: theme.darkAlgorithm, token: { colorPrimary: '#006D35', borderRadius: 12, colorBgContainer: 'rgba(255, 255, 255, 0.05)' } }}>
            <Select
              className="w-48 h-[44px] antd-bold-select"
              value={jurisdiction}
              onChange={setJurisdiction}
              options={[{ value: "All States", label: "All States" }, { value: "Lagos", label: "Lagos" }, { value: "FCT", label: "FCT" }]}
            />
            <Select
              className="w-48 h-[44px] antd-bold-select"
              value={entityGroup}
              onChange={setEntityGroup}
              options={[{ value: "All Companies", label: "All Companies" }, { value: "Retail", label: "Retail" }, { value: "Industrial", label: "Industrial" }]}
            />
          </ConfigProvider>
        </div>

        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-10">
          {activeTab === "territorial" 
            ? "Multi-state user density and economic activity across jurisdictions"
            : "Multi-state total spend and transaction analysis across regions"}
        </p>

        {/* Mock Map Visualization */}
        <div className="glass-card border-white/5 bg-black/40 rounded-[2rem] overflow-hidden mb-12 relative aspect-[21/9] group shadow-2xl">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={6}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                mapTypeId: 'satellite',
                styles: [
                  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                ],
                disableDefaultUI: false,
              }}
            >
              {regions.map(region => (
                <Marker
                  key={region.id}
                  position={region.position}
                  title={region.name}
                  onClick={() => console.log(`Clicked ${region.name}`)}
                />
              ))}
            </GoogleMap>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary/80 animate-pulse">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Map Satellite Protocol Initializing...</span>
            </div>
          )}

          <button className="absolute top-6 right-6 z-10 p-2 bg-secondary/80 backdrop-blur-md rounded-xl border border-white/5 text-white/60 shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>

          {/* Grid Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="w-full h-full border-white/20 border-l border-t" style={{ backgroundSize: '100px 100px', backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)' }}></div>
          </div>

          {/* Hotspots - made non-blocking */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Lagos Hotspot */}
            <div className="absolute top-[60%] left-[25%] group/pin">
              <div className="w-12 h-12 bg-primary/20 rounded-full animate-ping absolute -inset-4"></div>
              <div className="w-4 h-4 bg-primary-light rounded-full border-2 border-white shadow-[0_0_20px_#00A651]"></div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-secondary/90 backdrop-blur-xl p-3 border border-primary/20 rounded-xl opacity-0 group-hover/pin:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-2xl">
                <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Lagos Metro</p>
                <p className="text-[9px] font-black text-primary-light uppercase tracking-widest">High Activity</p>
              </div>
            </div>

            {/* FCT Hotspot */}
            <div className="absolute top-[40%] left-[55%] group/pin">
              <div className="w-12 h-12 bg-accent-gold/20 rounded-full animate-ping absolute -inset-4"></div>
              <div className="w-4 h-4 bg-accent-gold rounded-full border-2 border-white shadow-[0_0_20px_#F0B323]"></div>
            </div>

            {/* Port Harcourt */}
            <div className="absolute top-[80%] left-[45%] group/pin">
              <div className="w-8 h-8 bg-orange-500/20 rounded-full animate-ping absolute -inset-2"></div>
              <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-[0_0_20px_#FF5A5A]"></div>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-6 left-6 z-10 flex space-x-6 bg-secondary/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/5 shadow-2xl">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary-light shadow-[0_0_10px_#00A651]"></div>
              <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">High {activeTab === "territorial" ? "Activity" : "Spending"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-accent-gold shadow-[0_0_10px_#F0B323]"></div>
              <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Medium {activeTab === "territorial" ? "Activity" : "Spending"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_#FF5A5A]"></div>
              <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Low {activeTab === "territorial" ? "Activity" : "Spending"}</span>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="animate-in slide-in-from-bottom-4 duration-1000">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tighter">
              Multi-state Regional <span className="text-primary-light">Leaderboard</span>
            </h3>
          </div>

          <div className="overflow-x-auto custom-scrollbar border border-white/5 rounded-[2rem] bg-white/2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="px-10 py-6 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Territory/Region</th>
                  {activeTab === "territorial" ? (
                    <>
                      <th className="px-10 py-6 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Active Users</th>
                      <th className="px-10 py-6 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">TGV</th>
                      <th className="px-10 py-6 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Market Penetration</th>
                    </>
                  ) : (
                    <>
                      <th className="px-10 py-6 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Total Spend</th>
                      <th className="px-10 py-6 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Transactions</th>
                      <th className="px-10 py-6 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Avg Order Value</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(activeTab === "territorial" ? territorialData : buyingPowerData).map((row: any, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors group">
                    <td className="px-10 py-6">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4 group-hover:border-primary/50 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                        </div>
                        <span className="text-xs font-black text-white uppercase tracking-widest">{row.region}</span>
                      </div>
                    </td>
                    {activeTab === "territorial" ? (
                      <>
                        <td className="px-10 py-6">
                          <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="text-xs font-bold text-white/80">{row.activeUsers}</span>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <span className="text-xs font-black text-primary-light uppercase">₦{row.tgv}</span>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-black ${row.color}`}>{row.penetration}</span>
                            <div className="w-24 bg-white/5 rounded-full h-1 overflow-hidden ml-4">
                              <div className="h-full bg-primary" style={{ width: row.penetration }}></div>
                            </div>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-10 py-6 text-xs font-black text-primary-light uppercase">{row.totalSpend}</td>
                        <td className="px-10 py-6 text-xs font-bold text-white/80">{row.transactions}</td>
                        <td className="px-10 py-6">
                          <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-primary-light uppercase tracking-widest">
                            {row.avgOrder}
                          </span>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeospatialIntel;
