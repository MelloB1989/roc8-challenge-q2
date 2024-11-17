import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AgeFilter() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select age" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Age</SelectLabel>
          <SelectItem value="0">15-25</SelectItem>
          <SelectItem value="1">{">25"}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
