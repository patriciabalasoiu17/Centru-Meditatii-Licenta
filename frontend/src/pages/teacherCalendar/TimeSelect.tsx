import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function TimeSelect() {
    var hours: string[] = []
    for (var i = 0; i < 24; i++) {
        if (i < 10) {
            hours.push(`0${i}`);
        } else {
            hours.push(`${i}`);
        }
    }
    
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Ora</SelectLabel>
                    {hours.map(hour => <SelectItem value={`${hour}`}>{hour}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
