import { Link, NavLink } from "react-router-dom";
import { Tractor, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocale } from "@/state/LocaleContext";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/tokenize", label: "Tokenize" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/iot", label: "IoT" },
  { to: "/voting", label: "Voting" },
];

export default function Navbar() {
  const { t, locale, setLocale } = useLocale();
  const labels: Record<string, string> = { "/": t("nav.home"), "/marketplace": t("nav.marketplace"), "/tokenize": t("nav.tokenize"), "/dashboard": t("nav.dashboard"), "/iot": t("nav.iot"), "/voting": t("nav.voting") };
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-card">
            <Leaf className="h-5 w-5 text-primary" />
          </div>
          <div className="leading-tight">
            <p className="text-sm text-muted-foreground">AgroChain</p>
            <p className="text-base font-semibold">LATAM</p>
          </div>
        </Link>

        <nav className="hidden gap-6 md:flex">
          {navItems.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.to === "/"}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`
              }
            >
              <span className="story-link">{labels[it.to] ?? it.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild>
            <Link to="/marketplace" className="hover-scale">{t("nav.launch")}</Link>
          </Button>
          <Select value={locale} onValueChange={(v) => setLocale(v as "en" | "es")}>
            <SelectTrigger className="w-[96px]">
              <SelectValue placeholder="Idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
