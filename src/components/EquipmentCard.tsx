import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MapPin, Coins } from "lucide-react";
import { useAgroChain } from "@/state/AgroChainContext";
import { useLocale } from "@/state/LocaleContext";

interface Props {
  id: string;
  name: string;
  location: string;
  image: string;
  priceUSD: number;
  tokenSupply: number;
  tokensSold: number;
  projectedAPY: number;
  onBuy?: (id: string) => void;
  ctaLabel?: string;
}

export default function EquipmentCard(props: Props) {
  const { dispatch } = useAgroChain();
  const { t } = useLocale();
  const pct = Math.round((props.tokensSold / props.tokenSupply) * 100);
  const remaining = props.tokenSupply - props.tokensSold;

  const handleBuy = () => {
    // buy 10 tokens as demo
    dispatch({ type: "BUY_TOKENS", equipmentId: props.id, amount: Math.min(10, remaining) });
    props.onBuy?.(props.id);
  };

  return (
    <Card className="overflow-hidden card-glass animate-enter">
      <img src={props.image} alt={`${props.name} in ${props.location}`} className="h-44 w-full object-cover" loading="lazy" />
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{props.name}</h3>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {props.location}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">{t("equipmentCard.projectedAPY")}</div>
            <div className="text-base font-semibold text-primary">{props.projectedAPY.toFixed(1)}%</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
          <div className="mb-2 flex items-center justify-between text-sm">
            <div className="text-muted-foreground">{t("equipmentCard.tokenSaleProgress")}</div>
            <div className="font-medium">{pct}%</div>
          </div>
        <Progress value={pct} className="mb-3" />
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Coins className="h-4 w-4" />
            <span>{props.tokensSold.toLocaleString()} / {props.tokenSupply.toLocaleString()} {t("equipmentCard.tokensSold")}</span>
          </div>
          <div className="font-medium">${props.priceUSD.toLocaleString()}</div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2">
        <Button onClick={handleBuy} disabled={remaining <= 0} className="hover-scale">
          {props.ctaLabel ?? (remaining > 0 ? t("equipmentCard.invest10") : t("equipmentCard.soldOut"))}
        </Button>
      </CardFooter>
    </Card>
  );
}
