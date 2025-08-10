import { Helmet } from "react-helmet-async";
import EquipmentCard from "@/components/EquipmentCard";
import { useAgroChain } from "@/state/AgroChainContext";
import { useLocale } from "@/state/LocaleContext";

export default function Marketplace() {
  const { state } = useAgroChain();
  const { t } = useLocale();
  return (
    <main className="container py-10">
      <Helmet>
        <title>{t("marketplace.seoTitle")}</title>
        <meta name="description" content={t("marketplace.seoDescription")} />
        <link rel="canonical" href="/marketplace" />
      </Helmet>

      <header className="mb-6">
        <h1 className="text-3xl font-bold">{t("marketplace.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("marketplace.subtitle")}</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {state.equipments.map((e) => (
          <EquipmentCard key={e.id} id={e.id} name={e.name} location={e.location} image={e.image} priceUSD={e.priceUSD} tokenSupply={e.tokenSupply} tokensSold={e.tokensSold} projectedAPY={e.projectedAPY} />
        ))}
      </section>
    </main>
  );
}
