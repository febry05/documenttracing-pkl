import { Check, ChevronsUpDown, Moon, Palette, Sun, SunMoon } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { useTheme } from "@/Components/theme-provider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible"

type Theme = "dark" | "light" | "system"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const currentTheme = localStorage.getItem("vite-ui-theme") as Theme;

  return (
    <Collapsible>
        <CollapsibleTrigger className="text-bold flex justify-between w-full" asChild>
            <Button variant="ghost" className="justify-start">
                <Palette className="me-6" size={18}/>
                Theme Settings
                <ChevronsUpDown className="ms-auto" size={12} />
            </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col text-muted-foreground">
            <Button className="col-span-2 border-s rounded-none ms-6" variant="ghost" onClick={() => setTheme("light")}>
                <Sun className="me-6" size={18}/>
                <span className="me-auto">
                    Light
                </span>
                {currentTheme == 'light' && <Check size={18} />}
            </Button>
            <Button className="col-span-2 border-s rounded-none ms-6" variant="ghost" onClick={() => setTheme("dark")}>
                <Moon className="me-6" size={18}/>
                <span className="me-auto">
                    Dark
                </span>
                {currentTheme == 'dark' && <Check size={18} />}
            </Button>
            <Button className="col-span-2 border-s rounded-none ms-6" variant="ghost" onClick={() => setTheme("system")}>
                <SunMoon className="me-6" size={18}/>
                <span className="me-auto">
                    Adapt to System
                </span>
                {currentTheme == 'system' && <Check size={18} />}
            </Button>
        </CollapsibleContent>
    </Collapsible>
  )
}
