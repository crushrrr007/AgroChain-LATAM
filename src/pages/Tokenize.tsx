import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useAgroChain, Equipment } from "@/state/AgroChainContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/state/LocaleContext";

export default function Tokenize() {
  const { dispatch } = useAgroChain();
  const { t } = useLocale();
  const [preview, setPreview] = useState<string | undefined>();
  const [form, setForm] = useState({
    name: "",
    location: "",
    priceUSD: "",
    tokenSupply: "",
    projectedAPY: "",
    revenueModel: "",
    specs: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.location || !form.priceUSD || !form.tokenSupply) return;
    const payload: Equipment = {
      id: crypto.randomUUID(),
      name: form.name,
      location: form.location,
      image: preview || "",
      priceUSD: Number(form.priceUSD),
      tokenSupply: Number(form.tokenSupply),
      tokensSold: 0,
      projectedAPY: Number(form.projectedAPY || 10),
      specs: form.specs.split("\n").filter(Boolean),
      revenueModel: form.revenueModel || "Rental + throughput fees",
      gps: { lat: 0, lng: 0 },
      usageHours: 0,
    };
    dispatch({ type: "ADD_EQUIPMENT", payload });
    setForm({ name: "", location: "", priceUSD: "", tokenSupply: "", projectedAPY: "", revenueModel: "", specs: "" });
    setPreview(undefined);
  };

  return (
    <main className="container py-10">
      <Helmet>
        <title>{t("tokenize.seoTitle")}</title>
        <meta name="description" content={t("tokenize.seoDescription")} />
        <link rel="canonical" href="/tokenize" />
      </Helmet>

      <h1 className="mb-6 text-3xl font-bold">{t("tokenize.title")}</h1>

      <Card className="card-glass">
        <CardHeader>
          <CardTitle>{t("tokenize.detailsTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">{t("tokenize.fields.name")}</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g., John Deere 6155M Tractor" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">{t("tokenize.fields.location")}</Label>
              <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g., Valle de Cauca, Colombia" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">{t("tokenize.fields.priceUSD")}</Label>
              <Input id="price" type="number" min={0} value={form.priceUSD} onChange={(e) => setForm({ ...form, priceUSD: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supply">{t("tokenize.fields.tokenSupply")}</Label>
              <Input id="supply" type="number" min={1} value={form.tokenSupply} onChange={(e) => setForm({ ...form, tokenSupply: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apy">{t("tokenize.fields.projectedAPY")}</Label>
              <Input id="apy" type="number" min={0} step="0.1" value={form.projectedAPY} onChange={(e) => setForm({ ...form, projectedAPY: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="revenue">{t("tokenize.fields.revenueModel")}</Label>
              <Input id="revenue" value={form.revenueModel} onChange={(e) => setForm({ ...form, revenueModel: e.target.value })} placeholder="e.g., Hourly rental + percentage of processed lots" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="specs">{t("tokenize.fields.specs")}</Label>
              <Textarea id="specs" rows={5} value={form.specs} onChange={(e) => setForm({ ...form, specs: e.target.value })} placeholder="Power rating\nCapacity\nSensors\nTelemetry" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="image">{t("tokenize.fields.photo")}</Label>
              <Input id="image" type="file" accept="image/*" onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return setPreview(undefined);
                const url = URL.createObjectURL(f);
                setPreview(url);
              }} />
              {preview && <img src={preview} alt={t("tokenize.fields.previewAlt")} className="mt-2 h-48 w-full rounded-md object-cover" />}
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="hover-scale">{t("tokenize.fields.submit")}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
