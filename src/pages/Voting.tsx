import { Helmet } from "react-helmet-async";
import { useAgroChain } from "@/state/AgroChainContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/state/LocaleContext";

export default function Voting() {
  const { state, dispatch } = useAgroChain();
  const { t } = useLocale();

  return (
    <main className="container py-10">
      <Helmet>
        <title>{t("voting.seoTitle")}</title>
        <meta name="description" content={t("voting.seoDescription")} />
        <link rel="canonical" href="/voting" />
      </Helmet>

      <h1 className="mb-6 text-3xl font-bold">{t("voting.title")}</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {state.proposals.map((p) => {
          const eq = state.equipments.find((e) => e.id === p.equipmentId);
          const total = Object.values(p.votes).reduce((a, b) => a + b, 0) || 1;
          return (
            <Card key={p.id} className="card-glass">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{p.title}</span>
                  <span className="text-sm text-muted-foreground">{eq?.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <p className="text-sm text-muted-foreground">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.options.map((opt) => (
                    <Button key={opt} disabled={p.status !== "active"} onClick={() => dispatch({ type: "CAST_VOTE", proposalId: p.id, option: opt })} className="hover-scale">
                      {opt}
                    </Button>
                  ))}
                </div>
                <div className="grid gap-2">
                  {Object.entries(p.votes).map(([opt, n]) => (
                    <div key={opt} className="text-sm">
                      <span className="text-muted-foreground mr-2">{opt}</span>
                      <span className="font-medium">{n}</span>
                      <span className="text-muted-foreground"> ({Math.round((n / total) * 100)}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
