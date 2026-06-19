"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Compass, Layers, MapPin, ZoomIn, ZoomOut, Home, Navigation, RotateCcw } from "lucide-react";

export interface MapUMKM {
  id: string;
  name: string;
  owner: string;
  category: "Kuliner" | "Fashion & Batik" | "Kerajinan";
  kecamatan: "Ilir Barat I" | "Seberang Ulu I" | "Sukarami" | "Kemuning" | "Jakabaring" | "Plaju";
  address: string;
  distance?: string;
  rating?: number;
  phone: string;
  nib?: string;
  status?: "verified" | "pending";
  lat: number;
  lng: number;
}

interface UMKMMapProps {
  umkmList: any[];
  selectedUMKM: any | null;
  onSelectUMKM: (umkm: any | null) => void;
  selectedDistrict: string;
  onSelectDistrict: (dist: string) => void;
  categoryFilter: string;
  searchQuery: string;
  hideHomeMarker?: boolean;
}

const DISTRICT_BOUNDS: { [key: string]: [number, number][] } = {
  "Sukarami": [
    [-2.9100, 104.7000],
    [-2.9000, 104.7350],
    [-2.9300, 104.7500],
    [-2.9500, 104.7150],
  ],
  "Kemuning": [
    [-2.9450, 104.7400],
    [-2.9450, 104.7650],
    [-2.9700, 104.7650],
    [-2.9700, 104.7300],
  ],
  "Ilir Barat I": [
    [-2.9700, 104.7100],
    [-2.9700, 104.7550],
    [-2.9920, 104.7500],
    [-3.0000, 104.7100],
  ],
  "Seberang Ulu I": [
    [-2.9900, 104.7350],
    [-3.0150, 104.7400],
    [-3.0250, 104.7700],
    [-2.9900, 104.7700],
  ],
  "Jakabaring": [
    [-2.9900, 104.7700],
    [-3.0280, 104.7700],
    [-3.0350, 104.8100],
    [-3.0000, 104.8100],
  ],
  "Plaju": [
    [-3.0000, 104.8100],
    [-3.0350, 104.8100],
    [-3.0250, 104.8450],
    [-2.9900, 104.8300],
  ]
};

const PALEMBANG_CENTER: [number, number] = [-2.985, 104.755];
const CUSTOMER_HOME: [number, number] = [-2.9812, 104.7562];

export default function UMKMMap({
  umkmList,
  selectedUMKM,
  onSelectUMKM,
  selectedDistrict,
  onSelectDistrict,
  categoryFilter,
  searchQuery,
  hideHomeMarker = false,
}: UMKMMapProps) {
  const { resolvedTheme } = useTheme();
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [mapType, setMapType] = useState<"street" | "satellite" | "terrain">("street");
  const [errorLoading, setErrorLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const polygonsRef = useRef<{ [key: string]: any }>({});
  const routingLineRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const homeMarkerRef = useRef<any>(null);

  // Dynamically load Leaflet assets
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ((window as any).L) {
      setLeafletLoaded(true);
      return;
    }

    let isMounted = true;

    const loadCSS = () => {
      if (document.getElementById("leaflet-css")) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.id = "leaflet-css";
      document.head.appendChild(link);
    };

    const loadJS = () => {
      if (document.getElementById("leaflet-js")) {
        const checkInterval = setInterval(() => {
          if ((window as any).L) {
            clearInterval(checkInterval);
            if (isMounted) setLeafletLoaded(true);
          }
        }, 100);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.id = "leaflet-js";
      script.async = true;
      script.onload = () => {
        if (isMounted) setLeafletLoaded(true);
      };
      script.onerror = () => {
        if (isMounted) setErrorLoading(true);
      };
      document.body.appendChild(script);
    };

    loadCSS();
    loadJS();

    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!leafletLoaded || !containerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    // Destroy existing map
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    // Create map instance
    const map = L.map(containerRef.current, {
      center: PALEMBANG_CENTER,
      zoom: 12.5,
      zoomControl: false, // Use our own premium buttons
      attributionControl: false,
    });

    mapRef.current = map;

    // Add Tile Layer
    updateTileLayer(L, resolvedTheme, mapType);

    // Create custom pulsing home icon
    const createHomeIcon = () => {
      const html = `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-8 h-8 rounded-full bg-blue-500/35 animate-ping"></div>
          <div class="relative flex items-center justify-center w-7.5 h-7.5 rounded-full shadow-lg border-2 border-white bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <div class="absolute bottom-full mb-1 bg-blue-600 text-white font-bold text-[8px] px-1.5 py-0.5 rounded shadow whitespace-nowrap z-[1000]">
            📍 Rumah Anda
          </div>
        </div>
      `;
      return L.divIcon({
        html,
        className: "custom-home-marker",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
    };

    // Add Home Marker
    if (!hideHomeMarker) {
      homeMarkerRef.current = L.marker(CUSTOMER_HOME, { icon: createHomeIcon() })
        .addTo(map)
        .bindTooltip("Rumah Anda (Titik Acuan)", { permanent: false, direction: "top" });
    }

    // Inject custom animation styles if not already present
    if (!document.getElementById("map-animation-styles")) {
      const style = document.createElement("style");
      style.id = "map-animation-styles";
      style.innerHTML = `
        @keyframes mapRouteDash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .routing-animated-line {
          stroke-dasharray: 6, 8;
          animation: mapRouteDash 1.5s linear infinite !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [leafletLoaded]);

  // Update Tile Layer when theme or type changes
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current) return;
    const L = (window as any).L;
    updateTileLayer(L, resolvedTheme, mapType);
  }, [resolvedTheme, mapType, leafletLoaded]);

  // Helper to handle Tile Layer updates
  const updateTileLayer = (L: any, theme: string | undefined, type: "street" | "satellite" | "terrain") => {
    if (!mapRef.current) return;

    if (tileLayerRef.current) {
      mapRef.current.removeLayer(tileLayerRef.current);
    }

    let url = "";
    if (type === "satellite") {
      url = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
    } else if (type === "terrain") {
      url = "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
    } else {
      // street map
      const isDark = theme === "dark";
      url = isDark 
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
    }

    tileLayerRef.current = L.tileLayer(url, {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapRef.current);
  };

  // Re-draw Markers when filters or list changes
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current) return;
    const L = (window as any).L;

    // Remove existing markers
    Object.values(markersRef.current).forEach((m: any) => m.remove());
    markersRef.current = {};

    // Filter markers based on district, category, and search query
    const filtered = umkmList.filter((u) => {
      const mDistrict = selectedDistrict === "Semua" || u.kecamatan === selectedDistrict;
      const mCategory = categoryFilter === "Semua" || u.category === categoryFilter;
      const mSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase());
      return mDistrict && mCategory && mSearch;
    });

    // Create marker styles function
    const getCategoryColor = (cat: string) => {
      if (cat === "Kuliner") return "#f97316";
      if (cat === "Fashion & Batik") return "#a855f7";
      return "#14b8a6";
    };

    const getCategoryIcon = (cat: string) => {
      if (cat === "Kuliner") {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;
      }
      if (cat === "Fashion & Batik") {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M20.38 3.46L16 2.14a1 1 0 0 0-.6 0L11 3.46a1 1 0 0 1-.76 0L5.86 2.14a1 1 0 0 0-.6 0L.88 3.46A1 1 0 0 0 .26 4.3l1.8 9a1 1 0 0 0 .98.8H6.5a1 1 0 0 1 1 1v4.5A2.5 2.5 0 0 0 10 22h4a2.5 2.5 0 0 0 2.5-2.5V16.1a1 1 0 0 1 1-1h3.38a1 1 0 0 0 .98-.8l1.8-9a1 1 0 0 0-.62-.84z"/></svg>`;
      }
      return `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
    };

    filtered.forEach((umkm) => {
      const isSelected = selectedUMKM?.id === umkm.id;
      const color = getCategoryColor(umkm.category);
      const iconMarkup = getCategoryIcon(umkm.category);

      const markerHtml = `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-7.5 h-7.5 rounded-full opacity-35 ${isSelected ? 'animate-ping' : ''}" style="background-color: ${color}"></div>
          <div class="relative flex items-center justify-center w-6.5 h-6.5 rounded-full shadow-md border-2 border-white transition-all duration-200 ${isSelected ? 'scale-125 ring-2 ring-amber-500' : 'hover:scale-110'}" style="background-color: ${color}">
            ${iconMarkup}
          </div>
        </div>
      `;

      const icon = L.divIcon({
        html: markerHtml,
        className: "custom-leaflet-marker",
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        popupAnchor: [0, -13],
      });

      const marker = L.marker([umkm.lat, umkm.lng], { icon })
        .addTo(mapRef.current)
        .on("click", () => {
          onSelectUMKM(umkm);
        });

      // Bind tooltip for fast previews on hover
      marker.bindTooltip(`
        <div class="px-1.5 py-0.5 text-xs font-extrabold flex items-center gap-1 text-zinc-900">
          <span class="w-2 h-2 rounded-full" style="background-color: ${color}"></span>
          ${umkm.name}
        </div>
      `, { permanent: false, direction: "top", opacity: 0.95 });

      markersRef.current[umkm.id] = marker;
    });

  }, [umkmList, selectedDistrict, categoryFilter, searchQuery, selectedUMKM, leafletLoaded]);

  // Handle selected district polygon highlight and fit bounds
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current) return;
    const L = (window as any).L;

    // Clear old polygons
    Object.values(polygonsRef.current).forEach((p: any) => p.remove());
    polygonsRef.current = {};

    if (selectedDistrict !== "Semua" && DISTRICT_BOUNDS[selectedDistrict]) {
      const coords = DISTRICT_BOUNDS[selectedDistrict];
      
      const poly = L.polygon(coords, {
        color: resolvedTheme === "dark" ? "#14b8a6" : "#0f766e",
        fillColor: resolvedTheme === "dark" ? "#14b8a6" : "#0f766e",
        fillOpacity: 0.12,
        weight: 2,
        dashArray: "4, 4",
      }).addTo(mapRef.current);

      polygonsRef.current[selectedDistrict] = poly;

      // Fit bounds to polygon
      mapRef.current.fitBounds(poly.getBounds(), {
        padding: [30, 30],
        maxZoom: 14,
        animate: true,
        duration: 0.8,
      });
    } else if (selectedDistrict === "Semua" && !selectedUMKM) {
      // Reset view to center of Palembang
      mapRef.current.setView(PALEMBANG_CENTER, 12.5, {
        animate: true,
        duration: 0.8,
      });
    }
  }, [selectedDistrict, leafletLoaded, resolvedTheme]);

  // Handle selected UMKM routing line drawing and centering
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current) return;
    const L = (window as any).L;

    if (routingLineRef.current) {
      routingLineRef.current.remove();
      routingLineRef.current = null;
    }

    if (selectedUMKM) {
      const targetLoc: [number, number] = [selectedUMKM.lat, selectedUMKM.lng];
      
      if (!hideHomeMarker) {
        // Draw dotted path from Customer Home to Target UMKM
        routingLineRef.current = L.polyline([CUSTOMER_HOME, targetLoc], {
          color: "#f59e0b", // Amber accent color
          weight: 3.5,
          opacity: 0.9,
          className: "routing-animated-line",
        }).addTo(mapRef.current);

        // Fit bounds to show both customer home and target
        const bounds = L.latLngBounds([CUSTOMER_HOME, targetLoc]);
        mapRef.current.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 15,
          animate: true,
          duration: 0.8,
        });
      } else {
        // Just center map on target
        mapRef.current.setView(targetLoc, 14, {
          animate: true,
          duration: 0.8,
        });
      }

      // Programmatically trigger tooltip or popup on target marker if it exists
      const marker = markersRef.current[selectedUMKM.id];
      if (marker) {
        // Center view on target with offset to accommodate card overlay
        const latOffset = 0.003;
        mapRef.current.setView([selectedUMKM.lat - latOffset, selectedUMKM.lng], 14, {
          animate: true,
          duration: 0.8,
        });
      }
    }
  }, [selectedUMKM, leafletLoaded]);

  // Map Navigation Functions
  const handleZoomIn = () => {
    if (mapRef.current) mapRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapRef.current) mapRef.current.zoomOut();
  };

  const handleResetView = () => {
    if (mapRef.current) {
      onSelectUMKM(null);
      onSelectDistrict("Semua");
      mapRef.current.setView(PALEMBANG_CENTER, 12.5, {
        animate: true,
        duration: 0.8,
      });
    }
  };

  const handleLocateMe = () => {
    if (mapRef.current) {
      mapRef.current.setView(CUSTOMER_HOME, 15, {
        animate: true,
        duration: 0.8,
      });
    }
  };

  return (
    <div className="relative w-full h-full min-h-[350px] border border-custom bg-custom-sec rounded-2xl overflow-hidden shadow-inner flex flex-col justify-center items-center">
      {/* Map Element */}
      <div ref={containerRef} className="w-full h-full absolute inset-0 z-10" />

      {/* Grid Pattern overlays */}
      {!leafletLoaded && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none z-0" />
      )}

      {/* Loading Overlay */}
      {!leafletLoaded && !errorLoading && (
        <div className="absolute inset-0 bg-custom-sec/90 flex flex-col items-center justify-center gap-3 z-30">
          <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-custom-muted">Memuat Peta Realistis Palembang...</span>
        </div>
      )}

      {/* Error Loading Overlay */}
      {errorLoading && (
        <div className="absolute inset-0 bg-custom-sec/95 flex flex-col items-center justify-center p-6 text-center gap-3 z-30">
          <MapPin size={32} className="text-red-500" />
          <div>
            <h4 className="font-extrabold text-custom-main text-sm">Gagal Memuat Peta</h4>
            <p className="text-[10px] text-custom-muted max-w-xs mt-1">
              Koneksi internet diperlukan untuk mengunduh modul visual peta dari OpenStreetMap.
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-1.5 bg-brand-primary text-white text-[10px] font-bold rounded-lg hover:opacity-90"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Floating Map Controls - Top Left */}
      {leafletLoaded && (
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-xl bg-custom-card border border-custom flex items-center justify-center text-custom-main hover:bg-custom-ter hover:text-brand-primary shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Perbesar"
          >
            <ZoomIn size={15} />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-xl bg-custom-card border border-custom flex items-center justify-center text-custom-main hover:bg-custom-ter hover:text-brand-primary shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Perkecil"
          >
            <ZoomOut size={15} />
          </button>
        </div>
      )}

      {/* Floating Map Controls - Top Right */}
      {leafletLoaded && (
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-20">
          <div className="bg-custom-card border border-custom rounded-xl px-2 py-1 shadow-sm flex items-center gap-1.5 select-none opacity-90 hover:opacity-100 transition-opacity">
            <Compass size={14} className="text-brand-primary animate-pulse" />
            <span className="text-[9px] font-black text-custom-main uppercase tracking-widest">Palembang GIS</span>
          </div>
        </div>
      )}

      {/* Floating Map Controls - Bottom Left */}
      {leafletLoaded && (
        <div className="absolute bottom-3 left-3 flex gap-2 z-20">
          {!hideHomeMarker && (
            <button
              onClick={handleLocateMe}
              className="px-2.5 py-1.5 rounded-xl bg-custom-card border border-custom flex items-center gap-1.5 text-[10px] font-extrabold text-custom-main hover:bg-custom-ter hover:text-brand-primary shadow-sm hover:scale-102 active:scale-98 transition-all cursor-pointer"
              title="Ke Lokasi Saya"
            >
              <Navigation size={12} className="rotate-45" />
              <span>Lokasi Saya</span>
            </button>
          )}
          <button
            onClick={handleResetView}
            className="w-8 h-8 rounded-xl bg-custom-card border border-custom flex items-center justify-center text-custom-muted hover:bg-custom-ter hover:text-red-500 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Reset Peta"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      )}

      {/* Floating Layer Controls - Bottom Right */}
      {leafletLoaded && (
        <div className="absolute bottom-3 right-3 flex gap-1 bg-custom-card border border-custom rounded-xl p-1 shadow-md z-20">
          {[
            { id: "street", label: "🗺️ Peta" },
            { id: "satellite", label: "🛰️ Satelit" },
            { id: "terrain", label: "⛰️ Topo" }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setMapType(type.id as any)}
              className={`px-2 py-1 rounded-lg text-[9px] font-bold transition-all cursor-pointer ${
                mapType === type.id
                  ? "bg-brand-primary text-white"
                  : "text-custom-muted hover:bg-custom-ter hover:text-custom-main"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
