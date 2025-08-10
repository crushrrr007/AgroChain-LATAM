import { Helmet } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";
import { useAgroChain } from "@/state/AgroChainContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/state/LocaleContext";

export default function IoTSim() {
  const { state, dispatch } = useAgroChain();
  const [selected, setSelected] = useState<string>(state.equipments[0]?.id ?? "");
  const [running, setRunning] = useState(false);
  const { t } = useLocale();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running || !selected) return;
    timerRef.current = window.setInterval(() => {
      const dHours = +(Math.random() * 0.5).toFixed(2);
      const dLat = (Math.random() - 0.5) * 0.002;
      const dLng = (Math.random() - 0.5) * 0.002;
      dispatch({ type: "IOT_TICK", equipmentId: selected, dHours, dLat, dLng });
    }, 1200);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [running, selected, dispatch]);

  const eq = state.equipments.find((e) => e.id === selected);

  return (
    <main className="container py-10">
      <Helmet>
        <title>{t("iot.seoTitle")}</title>
        <meta name="description" content={t("iot.seoDescription")} />
        <link rel="canonical" href="/iot" />
      </Helmet>

      <h1 className="mb-6 text-3xl font-bold">{t("iot.title")}</h1>

      <div className="mb-6 grid max-w-xl gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>{t("iot.equipment")}</Label>
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger>
              <SelectValue placeholder={t("iot.select")} />
            </SelectTrigger>
            <SelectContent>
              {state.equipments.map((e) => (
                <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button className="w-full hover-scale" onClick={() => setRunning((v) => !v)}>
            {running ? t("iot.stop") : t("iot.start")}
          </Button>
        </div>
      </div>

      {eq && (
        <Card className="card-glass">
          <CardHeader>
            <CardTitle>{eq.name} — {t("iot.live")}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-md border p-3">
              <div className="text-sm text-muted-foreground">{t("iot.gpsLat")}</div>
              <div className="text-lg font-semibold">{eq.gps?.lat.toFixed(5)}</div>
            </div>
            <div className="rounded-md border p-3">
              <div className="text-sm text-muted-foreground">{t("iot.gpsLng")}</div>
              <div className="text-lg font-semibold">{eq.gps?.lng.toFixed(5)}</div>
            </div>
            <div className="rounded-md border p-3">
              <div className="text-sm text-muted-foreground">{t("iot.usageHours")}</div>
              <div className="text-lg font-semibold">{eq.usageHours?.toFixed(2)}</div>
            </div>
            <img src={eq.image} alt={`${eq.name} in ${eq.location}`} className="md:col-span-3 h-56 w-full rounded-md object-cover" />
          </CardContent>
        </Card>
      )}
    </main>
  );
}
