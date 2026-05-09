import { FilterSection } from "@/features/find-services/components/filter-section";

const categories = ["Deep Cleaning", "Standard Cleaning", "Move-In/Move-Out", "Eco-Friendly"];
const ratings = ["4.5+ star", "4.0+ star"];
const availability = ["Same Day", "Weekends"];

export function FiltersSidebar() {
  return (
    <aside className="sticky top-20 h-fit rounded-xl border bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">Filters</h2>
        <button className="text-xs font-medium text-primary hover:underline">Reset</button>
      </div>

      <div className="space-y-4">
        <FilterSection title="Categories">
          <div className="space-y-2">
            {categories.map((item, index) => (
              <label
                key={item}
                className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground"
              >
                <input
                  type="checkbox"
                  defaultChecked={index === 0}
                  className="size-4 rounded border-input accent-primary"
                />
                {item}
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Price Range">
          <div className="grid grid-cols-2 gap-2">
            <input
              placeholder="$ Min"
              className="h-9 rounded-md border border-input bg-background px-2 text-sm shadow-xs"
            />
            <input
              placeholder="$ Max"
              className="h-9 rounded-md border border-input bg-background px-2 text-sm shadow-xs"
            />
          </div>
        </FilterSection>

        <FilterSection title="Minimum Rating">
          <div className="space-y-2">
            {ratings.map((item) => (
              <label
                key={item}
                className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground"
              >
                <input type="radio" name="rating" className="size-4 accent-primary" />
                {item}
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Availability">
          <div className="space-y-2">
            {availability.map((item) => (
              <label
                key={item}
                className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground"
              >
                <input type="checkbox" className="size-4 rounded border-input accent-primary" />
                {item}
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </aside>
  );
}
