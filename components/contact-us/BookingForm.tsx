"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ValidatedForm } from "@/components/ValidatedForm";
import { goToThankYou } from "@/utils/thankYou";

// SECTION 4: RATHER BOOK IT NOW?
const meetingTimes = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
];

const formatDateKey = (year: number, month: number, day: number) =>
  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

export default function BookingForm() {
  const now = new Date();
  const todayKey = formatDateKey(now.getFullYear(), now.getMonth(), now.getDate());
  const [viewDate, setViewDate] = useState(
    () => new Date(now.getFullYear(), now.getMonth(), 1),
  );
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    time: "",
    date: "",
    meetingType: "",
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const handleBookingChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bookingData.date || !bookingData.time) {
      setBookingError("Please select a date and time for your call.");
      return;
    }

    setBookingError("");
    setBookingLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingData,
          source: "Book Slot Section",
          agreeTerms: true,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        setBookingError(result.error || "We couldn’t confirm your booking. Please try again.");
        return;
      }

      goToThankYou();
    } catch (err) {
      console.error(err);
      setBookingError("We couldn’t send your request. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthTitle = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <section className="py-[clamp(48px,7vw,60px)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-[#f4edf7]">
      <div className="max-w-[1320px] mx-auto">
        {/* Top Pill Badge */}
        <div className="text-center mb-5">
          <span className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Pick a Time
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[clamp(30px,3vw,42px)] font-extrabold tracking-tight leading-[1.15] text-center text-[#591e60] mb-3">
          Rather <span className="text-[#d95959]">Book It</span> Now?
        </h2>

        {/* Subheading */}
        <p className="text-[16px] md:text-[18px] text-gray-700 font-normal text-center max-w-4xl lg:whitespace-nowrap mx-auto mb-14 leading-relaxed">
          Choose a slot and how you want to connect. We&apos;ll send the
          confirmation and the questions we&apos;ll cover.
        </p>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center max-w-[1320px] mx-auto">
          {/* Booking Scheduler */}
          <div className="lg:col-span-8 overflow-hidden rounded-[22px] bg-white shadow-xl antialiased">
            <div className="bg-[#591e60] px-5 py-4 sm:px-6">
              <h3 className="font-heading text-lg font-extrabold text-white">
                Schedule a Call
              </h3>
              <p className="mt-1 text-[13px] font-medium text-white/85">
                Pick a date, time, and tell us how you&apos;d like to connect.
              </p>
            </div>

            {bookingSuccess ? (
              <div className="px-6 py-12 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f4ee] text-2xl font-bold text-[#3d9d79]">
                  ✓
                </div>
                <h4 className="font-heading mb-2 text-xl font-bold text-[#4d2050]">
                  You&apos;re booked.
                </h4>
                <p className="mb-5 text-sm text-gray-600">
                  Confirmation is on its way to your inbox, along with the three things we&apos;ll ask about on the call.
                </p>
                <button
                  type="button"
                  onClick={() => setBookingSuccess(false)}
                  className="rounded-lg bg-[#591e60] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#4d2050]"
                >
                  Book Another Slot
                </button>
              </div>
            ) : (
              <ValidatedForm
                onSubmit={handleBookingSubmit}
                className="space-y-3 p-4 sm:p-5"
              >
                <div>
                  <label htmlFor="booking-meeting-type" className="mb-1 block text-[13px] font-semibold text-gray-700">Meeting type *</label>
                  <select
                    id="booking-meeting-type"
                    name="meetingType"
                    required
                    value={bookingData.meetingType}
                    onChange={handleBookingChange}
                    className="h-[42px] w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-[13px] text-gray-700 outline-none focus:border-[#591e60] focus:ring-2 focus:ring-[#591e60]/15"
                  >
                    <option value="">Choose how to connect</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Zoom">Zoom</option>
                    <option value="Google Meet">Google Meet</option>
                    <option value="Microsoft Teams">Microsoft Teams</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-1 md:grid-cols-2">
                  {/* Calendar */}
                  <div className="min-w-0">
                    <label className="mb-2 block text-[12px] font-semibold text-gray-600">Date *</label>
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-heading text-[13px] font-bold text-[#2d1b36]">
                        {monthTitle}
                      </h4>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          aria-label="Previous month"
                          onClick={() =>
                            setViewDate(new Date(year, month - 1, 1))
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-sm text-[#4d2050] transition-colors hover:bg-[#f4edf7]"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          aria-label="Next month"
                          onClick={() =>
                            setViewDate(new Date(year, month + 1, 1))
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-sm text-[#4d2050] transition-colors hover:bg-[#f4edf7]"
                        >
                          ›
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 text-center">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <span
                            key={day}
                            className="py-1.5 text-[10px] font-bold uppercase tracking-wide text-gray-400"
                          >
                            {day}
                          </span>
                        ),
                      )}
                      {Array.from({ length: firstWeekday }, (_, index) => (
                        <span key={`blank-${index}`} />
                      ))}
                      {Array.from({ length: daysInMonth }, (_, index) => {
                        const day = index + 1;
                        const dateKey = formatDateKey(year, month, day);
                        const isPast = dateKey < todayKey;
                        const weekday = new Date(year, month, day).getDay();
                        const isWeekend = weekday === 0 || weekday === 6;
                        const isUnavailable = isPast || isWeekend;
                        const isSelected = bookingData.date === dateKey;

                        return (
                          <button
                            key={dateKey}
                            type="button"
                            disabled={isUnavailable}
                            aria-pressed={isSelected}
                            aria-label={new Date(year, month, day).toLocaleDateString(
                              "en-US",
                              { dateStyle: "full" },
                            )}
                            onClick={() => {
                              setBookingData((prev) => ({
                                ...prev,
                                date: dateKey,
                                time: "",
                              }));
                              setBookingError("");
                            }}
                            className={`m-0.5 flex aspect-square items-center justify-center rounded-lg border text-[12px] font-semibold transition-colors ${
                              isSelected
                                ? "border-[#591e60] bg-[#591e60] text-white"
                              : isUnavailable
                                  ? "border-transparent bg-white text-gray-300"
                                  : "border-transparent bg-gray-50 text-gray-700 hover:border-[#cf6a63] hover:bg-[#fdf6f5]"
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Available times */}
                  <div>
                    <h4 className="mb-2 text-[12px] font-semibold text-gray-600">
                      Select a Time (EST) *
                    </h4>
                    <div className="grid grid-cols-2 gap-1.5 min-[480px]:grid-cols-3">
                      {meetingTimes.map((time) => {
                        const isSelected = bookingData.time === time;

                        return (
                          <button
                            key={time}
                            type="button"
                            disabled={!bookingData.date}
                            aria-pressed={isSelected}
                            onClick={() => {
                              setBookingData((prev) => ({ ...prev, time }));
                              setBookingError("");
                            }}
                            className={`min-h-[36px] rounded-md border px-1.5 py-1 text-[11px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                              isSelected
                                ? "border-[#591e60] bg-[#591e60] text-white"
                                : "border-gray-200 bg-white text-gray-700 hover:border-[#cf6a63] hover:bg-[#fdf6f5]"
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div>
                    <label htmlFor="booking-name" className="mb-1 block text-[13px] font-semibold text-gray-700">Name *</label>
                    <input
                      id="booking-name"
                      type="text"
                      name="name"
                      required
                      value={bookingData.name}
                      onChange={handleBookingChange}
                      placeholder="Your name"
                      className="h-[42px] w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-[13px] text-gray-800 outline-none placeholder:text-gray-400 focus:border-[#591e60] focus:ring-2 focus:ring-[#591e60]/15"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-email" className="mb-1 block text-[13px] font-semibold text-gray-700">Email *</label>
                    <input
                      id="booking-email"
                      type="email"
                      name="email"
                      required
                      value={bookingData.email}
                      onChange={handleBookingChange}
                      placeholder="Your email"
                      className="h-[42px] w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-[13px] text-gray-800 outline-none placeholder:text-gray-400 focus:border-[#591e60] focus:ring-2 focus:ring-[#591e60]/15"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-start gap-x-2 pt-1">
                  <input id="booking-agree-terms" type="checkbox" name="agreeTerms" required className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#591e60]" />
                  <label htmlFor="booking-agree-terms" className="min-w-0 flex-1 cursor-pointer text-[12px] leading-relaxed text-[#626262]">
                    I agree to receive communications from Prime Therapy Billing. See our{" "}
                    <a href="/privacy-policy" className="font-medium text-[#591e60] underline underline-offset-2 hover:text-[#d95959]">Privacy Policy</a>.
                  </label>
                </div>

                {bookingError && (
                  <p role="alert" className="text-center text-xs font-medium text-red-600">
                    {bookingError}
                  </p>
                )}

                {/* Same width as the Name field (one column of the 2-column grid above, which has a 0.5rem gap), centred */}
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="mx-auto flex min-h-[44px] w-full sm:w-[calc((100%-0.5rem)/2)] items-center justify-center gap-2 rounded-lg bg-[#591e60] px-4 py-2 text-center text-[14px] font-bold text-white shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {bookingLoading ? "Confirming..." : "Confirm My Slot"}
                  {!bookingLoading && <span aria-hidden="true">✓</span>}
                </button>
              </ValidatedForm>
            )}
          </div>

          {/* Right Side Shape: shown only from 1024px up, where it sits beside the form; below that the form
              takes the full width on its own */}
          <div className="lg:col-span-4 hidden lg:flex justify-center items-center">
            {/* Like the pricing page figures: the shadow sits on a wrapper (on the image the fade mask would trim it),
                and the artwork's ground shadow runs to its bottom edge, so the last 10% fades out */}
            {/* 120% of its column, spreading evenly into the gap beside the form (40px) and the page edge */}
            <div className="w-[120%] max-w-[460px] shrink-0 drop-shadow-[0_8px_16px_rgba(89,30,96,0.22)]">
              <img
                src="/imgs/contact-us-page/pick%20a%20time.webp"
                alt="Billing specialist pointing at his watch, ready to book a call"
                loading="lazy"
                decoding="async"
                className="block w-full h-auto object-contain select-none pointer-events-none mask-[linear-gradient(to_bottom,black_90%,transparent)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
