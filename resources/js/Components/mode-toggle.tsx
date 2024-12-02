import { Check, ChevronsUpDown, Moon, Palette, Sun, SunMoon } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { useTheme } from "@/Components/theme-provider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

type Theme = "dark" | "light" | "system"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const currentTheme = localStorage.getItem("vite-ui-theme") as Theme;

  return (
    <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-0">
            <AccordionTrigger className="p-0 border-0 hover:bg-accent hover:text-accent-foreground rounded pe-4">
                <Button variant="ghost" className="justify-start">
                    <Palette className="me-6" size={18}/>
                    Theme Settings
                </Button>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col text-muted-foreground">
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
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  )
}
