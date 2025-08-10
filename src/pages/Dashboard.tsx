import { Helmet } from "react-helmet-async";
import { useAgroChain } from "@/state/AgroChainContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/state/LocaleContext";

export default function Dashboard() {
  const { state } = useAgroChain();
  const { t } = useLocale();

  return (
    <main className="container py-10">
      <Helmet>
        <title>{t("dashboard.seoTitle")}</title>
        <meta name="description" content={t("dashboard.seoDescription")} />
        <link rel="canonical" href="/dashboard" />
      </Helmet>

      <h1 className="mb-6 text-3xl font-bold">{t("dashboard.title")}</h1>

      {state.ownerships.length === 0 ? (
        <p className="text-muted-foreground">{t("dashboard.empty")}</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {state.ownerships.map((o) => {
            const eq = state.equipments.find((e) => e.id === o.equipmentId);
            if (!eq) return null;
            const share = o.tokenAmount / eq.tokenSupply;
            const projectedAnnual = (eq.priceUSD * (eq.projectedAPY / 100)) * share;
            return (
              <Card key={o.equipmentId} className="card-glass">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{eq.name}</span>
                    <span className="text-sm text-muted-foreground">{eq.location}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="rounded-md border p-3">
                      <div className="text-muted-foreground">{t("dashboard.tokensOwned")}</div>
                      <div className="text-lg font-semibold">{o.tokenAmount.toLocaleString()}</div>
                    </div>
                    <div className="rounded-md border p-3">
                      <div className="text-muted-foreground">{t("dashboard.ownershipShare")}</div>
                      <div className="text-lg font-semibold">{(share * 100).toFixed(2)}%</div>
                    </div>
                    <div className="rounded-md border p-3">
                      <div className="text-muted-foreground">{t("dashboard.projectedAPY")}</div>
                      <div className="text-lg font-semibold">{eq.projectedAPY.toFixed(1)}%</div>
                    </div>
                    <div className="rounded-md border p-3">
                      <div className="text-muted-foreground">{t("dashboard.projectedAnnual")}</div>
                      <div className="text-lg font-semibold">${projectedAnnual.toFixed(0)}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <Button disabled className="hover-scale" title="MVP mock — payouts simulated in tx log">
                      {t("dashboard.claim")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <h2 className="mt-10 text-2xl font-semibold">{t("dashboard.recent")}</h2>
      <div className="mt-4 grid gap-3">
        {state.txLog.slice(0, 6).map((tx) => (
          <div key={tx.id} className="flex items-center justify-between rounded-md border bg-card/60 p-3 text-sm">
            <div className="text-muted-foreground">{new Date(tx.ts).toLocaleString()}</div>
            <div className="font-medium">{tx.memo}</div>
            <div className="truncate text-muted-foreground">{tx.hash}</div>
          </div>
        ))}
        {state.txLog.length === 0 && <p className="text-muted-foreground">{t("dashboard.noTx")}</p>}
      </div>
    </main>
  );}
