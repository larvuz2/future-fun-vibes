import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";

const genres = ["Action", "RPG", "Strategy", "Adventure", "Simulation", "Sports"];

export function FilterBar() {
  return (
    <div className="w-full flex items-center justify-between mb-8 gap-4">
      <div className="flex gap-4">
        <Select defaultValue="featured">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">
              <span className="flex items-center gap-2">
                Featured <Flame className="w-4 h-4 text-orange-500" />
              </span>
            </SelectItem>
            <SelectItem value="marketCap">Market Cap</SelectItem>
            <SelectItem value="lastTrade">Last Trade</SelectItem>
            <SelectItem value="creationTime">Creation Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        {genres.map((genre) => (
          <Button
            key={genre}
            variant="outline"
            className="rounded-full whitespace-nowrap"
            size="sm"
          >
            {genre}
          </Button>
        ))}
      </div>
    </div>
  );
}