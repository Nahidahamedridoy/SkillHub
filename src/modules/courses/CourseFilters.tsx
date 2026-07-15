"use client";

import React from "react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupPrefix,
  InputGroupSuffix,
  Select,
  SelectTrigger,
  SelectValue,
  SelectIndicator,
  SelectPopover,
  ListBox,
  ListBoxItem,
  Button
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { LuSearch, LuSlidersHorizontal, LuTrash2, LuX } from "react-icons/lu";

// ─── Shared filter state type ───────────────────────────────────────────────────

export interface FilterState {
  searchQuery: string;
  category: string;
  level: string;
  price: string;
  sortBy: string;
}

export const DEFAULT_FILTERS: FilterState = {
  searchQuery: "",
  category: "all",
  level: "all",
  price: "all",
  sortBy: "newest",
};

// ─── Props ──────────────────────────────────────────────────────────────────────

interface CourseFiltersProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onSearch?: () => void;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function CourseFilters({ filters, onChange, onSearch }: CourseFiltersProps) {
  const { searchQuery, category, level, price, sortBy } = filters;

  const [showAdvanced, setShowAdvanced] = React.useState(false);

  // ── Data ────────────────────────────────────────────────────────────────────

  const categories = [
    { key: "development",        label: "Development" },
    { key: "design",             label: "Design" },
    { key: "data-science",       label: "Data Science" },
    { key: "business",           label: "Business" },
    { key: "marketing",          label: "Marketing" },
    { key: "artificial-intelligence", label: "AI & ML" },
    { key: "cloud-computing",    label: "Cloud Computing" },
    { key: "finance",            label: "Finance" },
  ];

  const levels = [
    { key: "beginner",     label: "Beginner" },
    { key: "intermediate", label: "Intermediate" },
    { key: "advanced",     label: "Advanced" },
  ];

  const prices = [
    { key: "free", label: "Free" },
    { key: "paid", label: "Paid" },
  ];

  const sortOptions = [
    { key: "newest",  label: "Newest" },
    { key: "popular", label: "Popular" },
    { key: "rating",  label: "Highest Rated" },
  ];

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const set = (patch: Partial<FilterState>) => onChange({ ...filters, ...patch });

  const activeFiltersCount =
    (category !== "all" ? 1 : 0) +
    (level    !== "all" ? 1 : 0) +
    (price    !== "all" ? 1 : 0);

  const hasActiveFilters =
    searchQuery !== "" ||
    category !== "all" ||
    level    !== "all" ||
    price    !== "all" ||
    sortBy   !== "newest";

  const handleClear = () => onChange({ ...DEFAULT_FILTERS });

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <section className="w-full bg-background py-8 border-b border-default-100/60">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">

          {/* Main Controls Row */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
            {/* Search Input */}
            <div className="w-full md:max-w-xl">
              <InputGroup className="w-full border border-default-200 hover:border-default-400 focus-within:!border-primary transition-colors bg-background rounded-xl overflow-hidden h-12 flex items-center">
                <InputGroupPrefix className="pl-3 flex items-center justify-center">
                  <LuSearch className="text-default-400 w-4 h-4 mr-1 flex-shrink-0" />
                </InputGroupPrefix>
                <InputGroupInput
                  placeholder="Search courses by title, instructor, or keywords..."
                  value={searchQuery}
                  onChange={(e) => set({ searchQuery: e.target.value })}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      onSearch?.();
                    }
                  }}
                  className="flex-1 bg-transparent px-2 h-full text-sm outline-none border-none text-foreground placeholder:text-default-400"
                />
                {searchQuery && (
                  <InputGroupSuffix className="pr-3 flex items-center justify-center">
                    <Button
                      variant="ghost"
                      isIconOnly
                      size="sm"
                      onPress={() => set({ searchQuery: "" })}
                      className="text-default-400 hover:text-foreground h-6 w-6 rounded-full"
                    >
                      <LuX className="w-4 h-4" />
                    </Button>
                  </InputGroupSuffix>
                )}
                <InputGroupSuffix className="pr-3 flex items-center justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 rounded-lg font-semibold"
                    onPress={onSearch}
                  >
                    Search
                  </Button>
                </InputGroupSuffix>
              </InputGroup>
            </div>

            {/* Filter Toggle & Sort Select */}
            <div className="flex gap-3 w-full md:w-auto items-center justify-between md:justify-end">
              {/* Advanced Filters Toggle Button */}
              <Button
                variant={showAdvanced || activeFiltersCount > 0 ? "primary" : "outline"}
                onPress={() => setShowAdvanced(!showAdvanced)}
                className="flex-1 md:flex-initial font-semibold gap-2 h-12 min-w-[120px] rounded-xl"
              >
                <LuSlidersHorizontal
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showAdvanced ? "rotate-90" : ""
                  }`}
                />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="flex items-center justify-center bg-white text-primary dark:bg-primary dark:text-white rounded-full w-5 h-5 text-xs font-bold shadow-sm">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

              {/* Sort Select */}
              <div className="w-[160px] sm:w-[180px]">
                <Select
                  aria-label="Sort options"
                  placeholder="Sort By"
                  selectedKey={sortBy}
                  onSelectionChange={(key) => set({ sortBy: (key as string) || "newest" })}
                  className="w-full"
                >
                  <SelectTrigger className="w-full h-12 border border-default-200 hover:border-default-400 focus:border-primary transition-colors flex items-center justify-between px-3 rounded-xl bg-background text-sm">
                    <SelectValue />
                    <SelectIndicator className="w-4 h-4 text-default-400" />
                  </SelectTrigger>
                  <SelectPopover className="bg-background border border-default-100 shadow-xl rounded-xl p-1 outline-none min-w-[180px]">
                    <ListBox className="outline-none">
                      {sortOptions.map((opt) => (
                        <ListBoxItem
                          key={opt.key}
                          id={opt.key}
                          textValue={opt.label}
                          className="text-sm px-3 py-2 rounded-lg hover:bg-default-100 dark:hover:bg-default-50 cursor-pointer outline-none flex items-center justify-between data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
                        >
                          {opt.label}
                        </ListBoxItem>
                      ))}
                    </ListBox>
                  </SelectPopover>
                </Select>
              </div>
            </div>
          </div>

          {/* Collapsible Advanced Filters Panel */}
          <AnimatePresence initial={false}>
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-6 border-t border-default-100 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                  {/* Category Select */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground-500">Category</label>
                    <Select
                      aria-label="Category"
                      placeholder="All Categories"
                      selectedKey={category}
                      onSelectionChange={(key) => set({ category: (key as string) || "all" })}
                      className="w-full"
                    >
                      <SelectTrigger className="w-full h-12 border border-default-200 hover:border-default-400 focus:border-primary transition-colors flex items-center justify-between px-3 rounded-xl bg-background text-sm">
                        <SelectValue />
                        <SelectIndicator className="w-4 h-4 text-default-400" />
                      </SelectTrigger>
                      <SelectPopover className="bg-background border border-default-100 shadow-xl rounded-xl p-1 outline-none min-w-[200px]">
                        <ListBox className="outline-none">
                          <ListBoxItem
                            key="all"
                            id="all"
                            textValue="All Categories"
                            className="text-sm px-3 py-2 rounded-lg hover:bg-default-100 dark:hover:bg-default-50 cursor-pointer outline-none flex items-center justify-between data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
                          >
                            All Categories
                          </ListBoxItem>
                          {categories.map((cat) => (
                            <ListBoxItem
                              key={cat.key}
                              id={cat.key}
                              textValue={cat.label}
                              className="text-sm px-3 py-2 rounded-lg hover:bg-default-100 dark:hover:bg-default-50 cursor-pointer outline-none flex items-center justify-between data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
                            >
                              {cat.label}
                            </ListBoxItem>
                          ))}
                        </ListBox>
                      </SelectPopover>
                    </Select>
                  </div>

                  {/* Difficulty Level Select */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground-500">Difficulty Level</label>
                    <Select
                      aria-label="Difficulty Level"
                      placeholder="All Levels"
                      selectedKey={level}
                      onSelectionChange={(key) => set({ level: (key as string) || "all" })}
                      className="w-full"
                    >
                      <SelectTrigger className="w-full h-12 border border-default-200 hover:border-default-400 focus:border-primary transition-colors flex items-center justify-between px-3 rounded-xl bg-background text-sm">
                        <SelectValue />
                        <SelectIndicator className="w-4 h-4 text-default-400" />
                      </SelectTrigger>
                      <SelectPopover className="bg-background border border-default-100 shadow-xl rounded-xl p-1 outline-none min-w-[180px]">
                        <ListBox className="outline-none">
                          <ListBoxItem
                            key="all"
                            id="all"
                            textValue="All Levels"
                            className="text-sm px-3 py-2 rounded-lg hover:bg-default-100 dark:hover:bg-default-50 cursor-pointer outline-none flex items-center justify-between data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
                          >
                            All Levels
                          </ListBoxItem>
                          {levels.map((lvl) => (
                            <ListBoxItem
                              key={lvl.key}
                              id={lvl.key}
                              textValue={lvl.label}
                              className="text-sm px-3 py-2 rounded-lg hover:bg-default-100 dark:hover:bg-default-50 cursor-pointer outline-none flex items-center justify-between data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
                            >
                              {lvl.label}
                            </ListBoxItem>
                          ))}
                        </ListBox>
                      </SelectPopover>
                    </Select>
                  </div>

                  {/* Price Select */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground-500">Price</label>
                    <Select
                      aria-label="Price"
                      placeholder="All Prices"
                      selectedKey={price}
                      onSelectionChange={(key) => set({ price: (key as string) || "all" })}
                      className="w-full"
                    >
                      <SelectTrigger className="w-full h-12 border border-default-200 hover:border-default-400 focus:border-primary transition-colors flex items-center justify-between px-3 rounded-xl bg-background text-sm">
                        <SelectValue />
                        <SelectIndicator className="w-4 h-4 text-default-400" />
                      </SelectTrigger>
                      <SelectPopover className="bg-background border border-default-100 shadow-xl rounded-xl p-1 outline-none min-w-[180px]">
                        <ListBox className="outline-none">
                          <ListBoxItem
                            key="all"
                            id="all"
                            textValue="All Prices"
                            className="text-sm px-3 py-2 rounded-lg hover:bg-default-100 dark:hover:bg-default-50 cursor-pointer outline-none flex items-center justify-between data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
                          >
                            All Prices
                          </ListBoxItem>
                          {prices.map((prc) => (
                            <ListBoxItem
                              key={prc.key}
                              id={prc.key}
                              textValue={prc.label}
                              className="text-sm px-3 py-2 rounded-lg hover:bg-default-100 dark:hover:bg-default-50 cursor-pointer outline-none flex items-center justify-between data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
                            >
                              {prc.label}
                            </ListBoxItem>
                          ))}
                        </ListBox>
                      </SelectPopover>
                    </Select>
                  </div>

                  {/* Clear Filters Button */}
                  <Button
                    variant="danger-soft"
                    onPress={handleClear}
                    isDisabled={!hasActiveFilters}
                    className="w-full font-semibold gap-2 h-12 rounded-xl"
                  >
                    <LuTrash2 className="w-4 h-4" />
                    Clear Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}