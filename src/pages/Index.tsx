import { Helmet } from "react-helmet-async";
import hero from "@/assets/hero-agrochain.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Users, Blocks, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocale } from "@/state/LocaleContext";

const Index = () => {
  const { t } = useLocale();
  return (
    <main>
      <Helmet>
        <title>{t("home.seoTitle")}</title>
        <meta name="description" content={t("home.seoDescription")} />
        <link rel="canonical" href="/" />
      </Helmet>

      <section className="relative">
        <div className="absolute inset-0 bg-hero" />
        <img src={hero} alt={t("home.heroAlt")} className="h-[52vh] w-full object-cover opacity-40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-3xl animate-enter">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {t("home.heroTitle")}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {t("home.heroSub")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/marketplace" className="hover-scale">{t("home.ctaExplore")}</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/tokenize" className="hover-scale">{t("home.ctaTokenize")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: t("home.features.credible.title"), text: t("home.features.credible.text") },
            { icon: Users, title: t("home.features.coop.title"), text: t("home.features.coop.text") },
            { icon: Blocks, title: t("home.features.soroban.title"), text: t("home.features.soroban.text") },
            { icon: TrendingUp, title: t("home.features.yield.title"), text: t("home.features.yield.text") },
          ].map((f) => (
            <Card key={f.title} className="card-glass">
              <CardContent className="p-6">
                <f.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Index;
