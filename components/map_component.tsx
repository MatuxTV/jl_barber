'use client';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { useEffect, useRef, useState } from 'react';

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  className?: string;
}

function MapComponent({ center, zoom, className }: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (ref.current && mounted && window.google?.maps) {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        styles: [
          // Custom map styling for a modern look
          {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [{ "weight": "2.00" }]
          },
          {
            "featureType": "all",
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#9c9c9c" }]
          },
          {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [{ "visibility": "on" }]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{ "color": "#f2f2f2" }]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{ "color": "#ffffff" }]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }]
          }
        ],
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true
      });

      // Add custom marker for your business
      const marker = new window.google.maps.Marker({
        position: center,
        map: map,
        title: 'JL Barber & Ladyhair Salon',
        icon: {
          url: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#8B4513"/>
              <circle cx="16" cy="16" r="12" fill="white"/>
              <circle cx="16" cy="16" r="8" fill="#8B4513"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 16)
        }
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 5px 0; color: #8B4513;">JL Barber & Ladyhair Salon</h3>
            <p style="margin: 0; color: #666;">Farského 18, 851 01 Petržalka</p>
            <p style="margin: 5px 0 0 0; color: #666;">📞 +421 949 599 372</p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    }
  }, [center, zoom, mounted]);

  if (!mounted) {
    return (
      <div className={`bg-gray-100 rounded-2xl ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
            <p className="text-sm">Príprava mapy...</p>
          </div>
        </div>
      </div>
    );
  }

  return <div ref={ref} className={className} />;
}

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-2xl">
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main mx-auto mb-2"></div>
            <p className="text-sm">Načítavam mapu...</p>
          </div>
        </div>
      );
    case Status.FAILURE:
      return (
        <div className="flex items-center justify-center h-64 bg-red-50 rounded-2xl border-2 border-red-200">
          <div className="text-center text-red-500">
            <p className="text-sm">Chyba pri načítaní mapy</p>
          </div>
        </div>
      );
    default:
      return <></>;
  }
};

interface GoogleMapProps {
  className?: string;
}

export default function GoogleMap({ className }: GoogleMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className={`bg-gray-100 rounded-2xl ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
            <p className="text-sm">Inicializácia mapy...</p>
          </div>
        </div>
      </div>
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Note: NEXT_PUBLIC_ prefix

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center h-64 bg-yellow-50 rounded-2xl border-2 border-yellow-200">
        <div className="text-center text-yellow-600">
          <p className="text-sm">Google Maps API kľúč nie je nakonfigurovaný</p>
        </div>
      </div>
    );
  }

  // JL Barber & Ladyhair Salon coordinates (Farského 18, Petržalka)
  const center = { lat: 48.1283989, lng: 17.1128364 }; // Approximate coordinates for Petržalka
  const zoom = 16;

  return (
    <Wrapper apiKey={apiKey} render={render} libraries={['marker']}>
      <MapComponent center={center} zoom={zoom} className={className} />
    </Wrapper>
  );
}