
import { Check, ChevronsUpDown, Moon, Sun } from "lucide-react"

import { Button } from "@/Components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { ThemeProvider, useTheme } from "@/Components/theme-provider"
import React from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible"

export function ModeToggle() {
  const { setTheme } = useTheme()
  console.log(ThemeProvider.va);

  return (
    // <Collapsible>

    //     <CollapsibleTrigger className="text-bold flex justify-between">
    //         <Button className="flex" variant="ghost">
    //             Theme Settings
    //             <ChevronsUpDown size={16} className="ms-auto my-auto"/>
    //         </Button>
    //     </CollapsibleTrigger>
    //     <CollapsibleContent className="flex flex-col gap-4">
    //         <Button className="mt-4" variant="ghost" onClick={() => setTheme("light")}>
    //             Light

    //             {/* { useTheme == 'light' && <Check/>} */}
    //         </Button>
    //         <Button className="" variant="ghost" onClick={() => setTheme("dark")}>
    //             Dark
    //             {/* { useTheme == 'dark' && <Check/>} */}
    //         </Button>
    //         <Button className="" variant="ghost" onClick={() => setTheme("system")}>
    //             System
    //             {/* { useTheme == 'system' && <Check/>} */}
    //         </Button>
    //     </CollapsibleContent>
    // </Collapsible>
    // <div className="flex flex-col gap-2">
    //     <span className="text-bold">Theme Settings</span>
    //     <Button className="" variant="ghost" onClick={() => setTheme("light")}>
    //     <span className="text-left">

    //         Light
    //     </span>
    //     </Button>
    //     <Button className="" variant="ghost" onClick={() => setTheme("dark")}>
    //     <span className="text-left">

    //         Dark
    //     </span>
    //     </Button>
    //     <Button className="" variant="ghost" onClick={() => setTheme("system")}>
    //     <span className="text-left">

    //         System
    //     </span>
    //     </Button>
    // </div>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="shadow-none rounded-full w-12 h-12">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
                System
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
