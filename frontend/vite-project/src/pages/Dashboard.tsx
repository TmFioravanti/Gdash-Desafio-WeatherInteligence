import { useEffect, useState, type SetStateAction } from "react";
import api from "../lib/api";
import { Button } from "@/components/button";


type WeatherLog = {
  _id: string;
  timestamp: string;
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
};

type Insight = {
  summary: string;
  comfortScore: number;
  trend: string;
};

export function Dashboard() {
  const [logs, setLogs] = useState<WeatherLog[]>([]);
  const [insights, setInsights] = useState<Insight | null>(null);

  useEffect(() => {
    api.get("/weather/logs").then((res: { data: SetStateAction<WeatherLog[]>; }) => setLogs(res.data));
    api.get("/weather/insights").then((res: { data: SetStateAction<Insight | null>; }) => setInsights(res.data));
  }, []);

  const exportCsv = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/weather/export/csv`;
  };

  const exportXlsx = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/weather/export/xlsx`;
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard de Clima</h1>
        <div className="flex gap-2">
          <Button onClick={exportCsv}>Exportar CSV</Button>
          <Button onClick={exportXlsx}>Exportar XLSX</Button>
        </div>
      </div>

      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded p-4">
            <h2 className="font-semibold mb-1">Resumo</h2>
            <p className="text-sm">{insights.summary}</p>
          </div>
          <div className="border rounded p-4">
            <h2 className="font-semibold mb-1">Conforto climático</h2>
            <p className="text-2xl font-bold">{insights.comfortScore}/100</p>
          </div>
          <div className="border rounded p-4">
            <h2 className="font-semibold mb-1">Tendência</h2>
            <p>{insights.trend}</p>
          </div>
        </div>
      )}

      <table className="w-full text-left border mt-4 text-sm">
        <thead>
          <tr className="bg-slate-100">
            <th className="border px-2 py-1">Data/Hora</th>
            <th className="border px-2 py-1">Cidade</th>
            <th className="border px-2 py-1">Condição</th>
            <th className="border px-2 py-1">Temp (°C)</th>
            <th className="border px-2 py-1">Umidade (%)</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td className="border px-2 py-1">
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td className="border px-2 py-1">{log.city}</td>
              <td className="border px-2 py-1">{log.condition}</td>
              <td className="border px-2 py-1">{log.temperature}</td>
              <td className="border px-2 py-1">{log.humidity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
