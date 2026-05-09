"use client";

import { useState } from "react";

import {
  BadgeCheck,
  CalendarDays,
  Camera,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Shield,
  Star,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const includedItems = [
  "Deep scrub of all kitchen surfaces and exterior cabinets",
  "Vacuuming and mopping of all floors including under furniture",
  "Complete disinfection of bathrooms and tile grout",
  "Cleaning of window sills and interior glass surfaces",
  "Dusting and wiping of all baseboards and light fixtures",
  "Removal of cobwebs and detailed appliance exterior cleaning",
];

const reviews = [
  {
    initials: "SM",
    name: "Sarah Mitchell",
    date: "March 12, 2024",
    body: "David did an absolutely incredible job. My kitchen hasn't looked this good since the day we moved in. He was punctual, professional, and very thorough with the detailed areas I requested.",
  },
  {
    initials: "JK",
    name: "James K.",
    date: "February 28, 2024",
    body: "Great service overall. He missed one spot behind the fridge but was happy to come back and fix it immediately. Highly recommend for the price.",
  },
];

const faqItems = [
  {
    question: "What cleaning supplies do I need to provide?",
    answer:
      "None! All of our professional cleaners bring their own eco-friendly cleaning supplies and commercial-grade equipment including vacuums and steam cleaners.",
  },
  {
    question: "Do I need to be home during the service?",
    answer:
      "No. You can either be present or provide entry instructions in advance. The provider will notify you upon arrival and completion.",
  },
];

const slots = [
  { name: "Morning", time: "9 AM - 12 PM", status: "Available", disabled: false },
  { name: "Mid-Day", time: "12 PM - 3 PM", status: "Available", disabled: false },
  { name: "Afternoon", time: "3 PM - 6 PM", status: "2 spots left", disabled: false },
  { name: "Evening", time: "6 PM - 9 PM", status: "Booked", disabled: true },
];

export function ServiceDetailsPage() {
  const [selectedSlot, setSelectedSlot] = useState("Morning");
  const selectedSlotDetails = slots.find((slot) => slot.name === selectedSlot) ?? slots[0];

  return (
    <div className="bg-muted/25 py-8 md:py-10">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <section className="space-y-5">
            <div>
              <p className="text-xs text-muted-foreground">Home &gt; Cleaning Services &gt; Deep Home Cleaning</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Deep Home Cleaning</h1>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <p className="inline-flex items-center gap-1">
                  <Star className="size-4 fill-amber-500 text-amber-500" />
                  <Star className="size-4 fill-amber-500 text-amber-500" />
                  <Star className="size-4 fill-amber-500 text-amber-500" />
                  <Star className="size-4 fill-amber-500 text-amber-500" />
                  <Star className="size-4 fill-amber-500 text-amber-500" />
                  <span className="ml-1 font-medium text-foreground">4.9</span>
                  <span>(124 reviews)</span>
                </p>
                <span>|</span>
                <p className="inline-flex items-center gap-1">
                  <Clock3 className="size-4 text-primary" />
                  Duration: 3-4 hours
                </p>
              </div>
            </div>

            <div className="grid h-[320px] grid-cols-2 gap-2 md:grid-cols-4">
              <div className="relative col-span-2 row-span-2 overflow-hidden rounded-xl bg-linear-to-br from-cyan-100 to-cyan-200">
                <div className="absolute inset-0 bg-linear-to-tr from-cyan-900/5 to-transparent" />
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/85 px-2 py-1 text-xs font-medium shadow-xs">
                  <Camera className="size-3.5 text-primary" />
                  12 photos
                </div>
              </div>
              <div className="overflow-hidden rounded-xl bg-linear-to-br from-slate-300 to-slate-500" />
              <div className="overflow-hidden rounded-xl bg-linear-to-br from-cyan-800/80 to-slate-800" />
              <div className="col-span-2 overflow-hidden rounded-xl bg-linear-to-br from-cyan-100 to-cyan-300" />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>What&apos;s included</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                {includedItems.map((item) => (
                  <p key={item} className="inline-flex items-start gap-2 text-sm text-muted-foreground">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </p>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="flex items-start justify-between gap-4 py-4">
                <div className="flex gap-3">
                  <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary">
                    DM
                  </div>
                  <div>
                    <p className="text-base font-semibold">David Miller</p>
                    <p className="text-xs text-muted-foreground">8 years of experience • 450+ services completed</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      &quot;I specialize in high-detail residential cleaning and restoration. My goal is to
                      make every home feel brand new.&quot;
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Select Arrival Window</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {slots.map((slot) => (
                  <button
                    key={slot.name}
                    type="button"
                    disabled={slot.disabled}
                    onClick={() => setSelectedSlot(slot.name)}
                    className={cn(
                      "rounded-lg border p-3 text-left transition",
                      slot.disabled && "cursor-not-allowed bg-muted opacity-70",
                      selectedSlot === slot.name && "border-2 border-primary bg-primary/5",
                      !slot.disabled && selectedSlot !== slot.name && "hover:border-primary/40"
                    )}
                  >
                    <p className={cn("text-xs font-semibold", selectedSlot === slot.name ? "text-primary" : "text-muted-foreground")}>
                      {slot.name}
                    </p>
                    <p className="text-lg font-semibold">{slot.time}</p>
                    <p className="text-xs text-muted-foreground">{slot.status}</p>
                  </button>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Client Reviews</h2>
                <button className="text-sm font-medium text-primary hover:underline">Write a review</button>
              </div>
              {reviews.map((review) => (
                <Card key={review.name}>
                  <CardContent className="space-y-2 py-1">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="inline-flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                          {review.initials}
                        </div>
                        <div>
                          <p className="font-medium">{review.name}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <p className="inline-flex items-center gap-0.5 text-amber-500">
                        <Star className="size-3.5 fill-amber-500" />
                        <Star className="size-3.5 fill-amber-500" />
                        <Star className="size-3.5 fill-amber-500" />
                        <Star className="size-3.5 fill-amber-500" />
                        <Star className="size-3.5 fill-amber-500" />
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {faqItems.map((item, index) => (
                  <details key={item.question} className="group border-b py-2" open={index === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                      {item.question}
                      <ChevronDown className="size-4 transition group-open:rotate-180" />
                    </summary>
                    <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
                  </details>
                ))}
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-4">
            <Card className="sticky top-20 shadow-md pt-0">
              <CardHeader className="bg-primary text-primary-foreground py-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wide text-primary-foreground/85">Service Total</p>
                  <span className="rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[11px] font-medium">
                    Flat Rate
                  </span>
                </div>
                <CardTitle className="text-4xl">$189.00</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 py-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Deep Home Cleaning</span>
                    <span className="font-medium">$165.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Kitchen Deep Sanitization</span>
                    <span className="font-medium">$24.00</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-2">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="font-medium">$0.00 (Promo)</span>
                  </div>
                </div>

                <div className="rounded-lg border bg-muted/40 p-3 text-sm">
                  <p className="inline-flex items-center gap-2 font-medium">
                    <CalendarDays className="size-4 text-primary" />
                    Scheduled Arrival
                  </p>
                  <p className="mt-1 text-muted-foreground">Tomorrow, Mar 15 • {selectedSlotDetails.time}</p>
                </div>

                <Button className="h-11 w-full text-base">Book This Service</Button>
                <p className="inline-flex w-full items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Shield className="size-3.5 text-primary" />
                  Secured by ServiceHub Trust Guarantee
                </p>
              </CardContent>
            </Card>

            <Card className="bg-secondary/40">
              <CardHeader>
                <CardTitle>The Hub Promise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="inline-flex items-start gap-2 text-muted-foreground">
                  <Shield className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    <span className="font-medium text-foreground">Vetted Professionals</span>
                    <br />
                    Rigorous background checks and skill verification.
                  </span>
                </p>
                <p className="inline-flex items-start gap-2 text-muted-foreground">
                  <CircleDollarSign className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    <span className="font-medium text-foreground">Fair Price Guarantee</span>
                    <br />
                    Upfront pricing with no hidden fees or tips expected.
                  </span>
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Container>
    </div>
  );
}
