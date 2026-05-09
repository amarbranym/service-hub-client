"use client";

import { useState } from "react";

import { MapPin } from "lucide-react";

import { Container } from "@/components/shared/container";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FiltersSidebar } from "@/features/find-services/components/filters-sidebar";
import { ServiceCard } from "@/features/find-services/components/service-card";

const services = [
  {
    name: "Elite Deep Cleaners",
    price: "$120+",
    rating: "4.9",
    description: "Specializing in multi-room deep cleaning and sanitization for modern family homes.",
    badge: "Eco Friendly",
  },
  {
    name: "Sparkle & Shine Co.",
    price: "$85+",
    rating: "4.7",
    description: "Reliable weekly or bi-weekly maintenance cleaning for busy professionals.",
    badge: "Flexible Scheduling",
  },
  {
    name: "Precision Pro Clean",
    price: "$150+",
    rating: "5.0",
    description: "Premium move-in/out services with a 100% deposit back guarantee.",
    badge: "Guaranteed",
  },
  {
    name: "Pure Earth Clean",
    price: "$105+",
    rating: "4.8",
    description: "All-natural cleaning for sensitive households. We use toxin-free products.",
    badge: "Pet Safe",
  },
  {
    name: "The Home Concierge",
    price: "$190+",
    rating: "4.6",
    description: "Full house management including cleaning, laundry, and organization services.",
    badge: "All-Inclusive",
  },
  {
    name: "Upholstery Experts",
    price: "$70+",
    rating: "4.9",
    description: "Specialized cleaning for sofas, carpets, and luxury fabrics using steam tech.",
    badge: "Specialist",
  },
];

const locations = ["New York, NY", "San Francisco, CA", "Chicago, IL", "Austin, TX", "Seattle, WA"];

export function FindServicesPage() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [isLocationCommandOpen, setIsLocationCommandOpen] = useState(false);

  return (
    <div className="bg-muted/20 py-8 md:py-10">
      <Container>
        <div className="mb-4 flex items-center bg-secondary justify-between rounded-lg px-3 py-4 text-xs text-muted-foreground">
          <p className="inline-flex items-center gap-1">
            <MapPin className="size-3.5 text-primary" />
            Service available in <span className="font-semibold text-primary">{selectedLocation}</span>
          </p>

          <button
            type="button"
            onClick={() => setIsLocationCommandOpen(true)}
            className="cursor-pointer text-xs font-medium text-primary underline-offset-4 hover:underline"
          >
            Change Location
          </button>
          <CommandDialog
            open={isLocationCommandOpen}
            onOpenChange={setIsLocationCommandOpen}
            title="Choose location"
            description="Search and pick a service location."
          >
            <Command>
              <CommandInput placeholder="Search location..." />
              <CommandList>
                <CommandEmpty>No location found.</CommandEmpty>
                <CommandGroup>
                  {locations.map((location) => (
                    <CommandItem
                      key={location}
                      value={location}
                      onSelect={() => {
                        setSelectedLocation(location);
                        setIsLocationCommandOpen(false);
                      }}
                    >
                      {location}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </CommandDialog>
        </div>

        <div className="grid items-start gap-4 lg:grid-cols-[260px_1fr]">
          <FiltersSidebar />

          <section className="space-y-4">
            <div className="">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Services &gt; Home Cleaning &gt; New York</p>
                  <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    Home Cleaning Services
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Showing 142 reliable cleaning professionals near you
                  </p>
                </div>
                <label className="text-sm text-muted-foreground">
                  Sort by:{" "}
                  <select className="ml-2 h-9 rounded-md border border-input bg-background px-2 text-sm shadow-xs">
                    <option>Recommended</option>
                    <option>Rating: High to Low</option>
                    <option>Price: Low to High</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.name} {...service} />
              ))}
            </div>

            <div className=" px-2 py-2 ">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">12</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
