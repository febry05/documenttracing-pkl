"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/Components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import { Link, router } from "@inertiajs/react"

const FormSchema = z.object({
    year: z.string().optional(),
    month: z.string().optional(),
})

export function DateSelectForm({ availableYears, selectedYear, selectedMonth }: { availableYears: number[], selectedYear: string, selectedMonth: string }) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            year: availableYears.includes(Number(selectedYear)) ? selectedYear : undefined,
            month: selectedMonth || undefined,
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        router.get(route("monitoring.index", [data.year, data.month]));
    }

const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 mt-1 me-1">
        {/* Year Field */}
        <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
                <FormItem>
                    <Select onValueChange={(value) => { field.onChange(value); form.handleSubmit(onSubmit)(); }} defaultValue={field.value ? field.value.toString() : ""}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {availableYears.map((year, index) => (
                                <SelectItem key={index} value={year.toString()}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />

        {/* Month Field */}
        <FormField
          control={form.control}
          name="month"
          render={({ field }) => (
            <FormItem>
                <Select onValueChange={(value) => { field.onChange(value); form.handleSubmit(onSubmit)(); }} defaultValue={field.value ? field.value.toString() : ""}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {months.map((month, index) => (
                            <SelectItem key={index} value={(index).toString()} onClick={() => form.handleSubmit(onSubmit)()}>
                                {month}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
